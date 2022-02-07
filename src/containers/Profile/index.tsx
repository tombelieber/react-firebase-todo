import { DatePicker, LoadingButton, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Avatar,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FC, useEffect } from "react";
import Dropzone, { IFileWithMeta } from "react-dropzone-uploader";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { storage } from "../../app/configs/firebase-config";
import { useAppSelector } from "../../app/configs/redux/hooks";
import { selectForceUser } from "../../app/configs/redux/slices/appSlice";
import { GENDER_OPTIONS } from "../../app/constants";
import useUser from "../../app/hooks/useUser";

type ProfileForm = {
  avatar: string;
  username: string;
  email: string;
  phone: string;
  gender: string;
  birthday: string;
};

type ProfileProps = {};

const Profile: FC<ProfileProps> = () => {
  // * get user from redux store
  const user = useAppSelector(selectForceUser);

  // call update user mutation
  const { mutateAsync, isLoading } = useUser().updateUserMtn;

  const { control, watch, handleSubmit, reset, setValue } =
    useForm<ProfileForm>({
      mode: "all",
      defaultValues: {
        avatar: user.avatar || "",
        username: "",
        email: "",
        phone: "",
        gender: "",
        birthday: "",
      },
    });

  // * reset form default values
  useEffect(() => {
    const { avatar, username, email, phone, gender, birthday } = user;

    console.log("user", user);

    reset({
      avatar,
      username,
      email,
      phone,
      gender,
      birthday: birthday
        ? new Timestamp(birthday.seconds, birthday.nanoseconds)
            .toDate()
            .toDateString()
        : "",
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // * the shortest
  const onSubmit = handleSubmit(
    ({ avatar, birthday, email, gender, phone, username }) => {
      mutateAsync({
        id: user.id,
        avatar: avatar ?? "",
        username: username.trim() ?? "",
        email: email.trim() ?? "",
        phone: phone.trim() ?? "",
        gender: gender ?? "",
        birthday: Timestamp.fromDate(new Date(birthday)) ?? "",
      });
    },
  );

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmitImage = (successFiles: IFileWithMeta[]) => {
    console.log(successFiles.map((f) => f.meta));

    const imageFile = successFiles[0];
    // setValue("avatar", successFiles[0].meta.url);
    const storageRef = ref(
      storage,
      `images/users-profiles/${user.id}/${imageFile.meta.name}`,
    );

    // Upload the file and metadata
    const uploadTask = uploadBytesResumable(storageRef, imageFile.file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        toast.error(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setValue("avatar", downloadURL);
        });
      },
    );
  };

  return (
    <>
      <Container maxWidth="sm">
        <form>
          <Stack gap={2} paddingTop={2}>
            <Stack direction="row" justifyContent="space-between">
              <Avatar alt="Remy Sharp" src={watch("avatar")} />

              {/* <Button variant="outlined" onClick={handleOpen}>
              Upload file
            </Button> */}
              <Dropzone
                onSubmit={handleSubmitImage}
                accept="image/*,audio/*,video/*"
                maxFiles={1}
                multiple={false}
                canRemove
                canCancel
              />
            </Stack>

            <Controller
              name="email"
              control={control}
              rules={{
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="email"
                  type="email"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name="username"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="username"
                  type="text"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              // rules={{}} // TODO, add hk +852 phone number validation : regex check
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="phone"
                  type="tel"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name="gender"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "this is required",
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl fullWidth error={!!error}>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Gender"
                    onChange={onChange}
                  >
                    {GENDER_OPTIONS.map(({ label, value }) => (
                      <MenuItem key={`gender-option-${value}`} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                  {error && <FormHelperText>{error?.message}</FormHelperText>}
                </FormControl>
              )}
            />

            <Controller
              name="birthday"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Basic example"
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />

            <LoadingButton
              loading={isLoading}
              variant="contained"
              type="submit"
              onClick={onSubmit}
            >
              Save
            </LoadingButton>
          </Stack>
        </form>
      </Container>
    </>
  );
};

export default Profile;
