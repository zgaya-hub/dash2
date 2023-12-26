import { NoRecordFoundIllustration } from "@/assets/Illestrations";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Box, SxProps, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface DataGridEmptyComponentProps {
  message?: string;
  width?: number;
  height?: number;
  sx?: SxProps;
}
export default function DataGridEmptyComponent({ message, height, sx, width }: DataGridEmptyComponentProps) {
  const { t } = useTranslation();

  const containerStyle = useThemeStyles<SxProps>((theme) => ({
    width: width ? theme.spacing(width) : "100%",
    height: height ? theme.spacing(height) : "100%",
    ...sx,
  }));

  return (
    <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} sx={containerStyle}>
      <NoRecordFoundIllustration />
      <Typography>{message ?? t("Component.DataGridPro.DataGridEmptyComponent.message")}</Typography>
    </Box>
  );
}
