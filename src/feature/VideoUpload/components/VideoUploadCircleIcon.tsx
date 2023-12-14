import { AirplaneIcon, SolidUploadIcon } from "@/components/icons";
import { CircularProgress, Stack, SxProps } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";

interface VideoUploadCircleIconProps {
  isLoading?: boolean;
  isDragActive?: boolean;
}

export default function VideoUploadCircleIcon({ isLoading, isDragActive }: VideoUploadCircleIconProps) {
  const iconContainerStyle = useThemeStyles<SxProps>((theme) => ({
    height: theme.spacing(16),
    width: theme.spacing(16),
    position: "relative",
  }));

  const iconStyle = useThemeStyles<SxProps>((theme) => ({
    height: theme.spacing(8),
    width: theme.spacing(8),
    color: theme.palette.text.secondary,
  }));

  if (isLoading) {
    return (
      <Stack sx={iconContainerStyle} justifyContent="center" alignItems="center">
        <CircularProgress size={150} color="inherit" />
      </Stack>
    );
  }

  return (
    <Stack sx={iconContainerStyle} justifyContent="center" alignItems="center">
      {isDragActive ? <AirplaneIcon sx={iconStyle} /> : <SolidUploadIcon sx={iconStyle} />}
    </Stack>
  );
}
