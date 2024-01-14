import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Card, CardActions, CardContent, CardMedia, Fade, Popover, Stack, SxProps, Typography } from "@mui/material";
import { format } from "date-fns";

import { CachedIcon, EditIcon, ErrorIcon, SaveIcon } from "@/components/icons";
import { DEFAULT_DATE_FORMAT } from "@/mock/constants";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { handleOnTruncateText } from "@/utils";

import { useGetSeriesDetailsById, useUpdateSeries } from "../../hooks";

import SeriesDetailsCardSkeleton from "./Skeleton";
import Button from "@/components/Button";
import SeriesDetailsEditForm from "./SeriesDetailsEditForm";
import { GetSeriesDetailsByIdOutput } from "zgaya.hub-client-types/lib";

interface SeriesDetailsCardProps {
  seriesId: string;
}

export default function SeriesDetailsCard({ seriesId }: SeriesDetailsCardProps) {
  const { t } = useTranslation();
  const { CountryChanger, GenreChanger, LanguageChanger, StatusChanger, formState, reset: formReset, TextField, DateChanger, PriceChanger, watch: watchFormValue, handleSubmit: handleSubmitForm } = SeriesDetailsEditForm();
  const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);
  const [editableField, setEditableField] = useState<string | null>(null);
  const { mutateAsync: updateSeriesMutateAsync, isPending: isUpdateSeriesLoading } = useUpdateSeries();
  const { data, refetch, isLoading: isLoading, error } = useGetSeriesDetailsById({ SeriesId: seriesId });

  const handleOnSave = async (input: GetSeriesDetailsByIdOutput) => {
    await updateSeriesMutateAsync(
      { SeriesId: data.ID },
      {
        AdditionalInfo: {
          Genre: input.genre,
          Status: input.status,
          OriginalLanguage: input.originalLanguage,
          OriginCountry: input.originCountry,
        },
        ReleaseDate: input.releaseDate ? +input.releaseDate : undefined,
        Title: input.title,
        PlotSummary: input.plotSummary,
        Image: {
          Url: input.imageUrl,
        },
        FinancialInfo: {
          Budget: input.budget,
          NetProfit: input.netProfit,
          Revenue: input.revenue,
        },
      }
    );
  };

  const handleOnCancel = () => {
    formReset();
  };

  const cardStyle: SxProps = {
    position: "relative",
  };

  const cardMediaStyle = useThemeStyles<SxProps>((theme) => ({
    minHeight: theme.spacing(32),
    backgroundSize: "cover",
  }));

  const errorIconStyle = useThemeStyles<SxProps>((theme) => ({
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  }));

  const refreshIconStyle = useThemeStyles<SxProps>((theme) => ({
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(6),
  }));

  const editIconStyle = useThemeStyles<SxProps>((theme) => ({
    position: "absolute",
    right: theme.spacing(0),
    background: theme.palette.background.default,
  }));

  if (isLoading) {
    return <SeriesDetailsCardSkeleton />;
  }

  const renderEditableText = (label: string, value: string | number, popoverField: ReactNode) => (
    <Stack direction="row" justifyContent="space-between" p={1} alignItems="end" onMouseEnter={() => setEditableField(label)} onMouseLeave={() => setEditableField(null)} position="relative">
      <Typography variant="h6">{label}</Typography>
      <Typography>
        {value}
        {editableField === label ? (
          <>
            <EditIcon fontSize="inherit" sx={editIconStyle} onClick={(event) => setAnchorEl(event.currentTarget)} iconButton={false} tooltip="Edit" />
            <Popover
              open={!!anchorEl}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              transformOrigin={{
                horizontal: "right",
                vertical: "top",
              }}
              anchorReference="anchorEl"
              anchorOrigin={{
                horizontal: "left",
                vertical: "top",
              }}
            >
              <Stack p={1}>{popoverField}</Stack>
              {/* <TextField register={register} name={name} autoFocus /> */}
            </Popover>
          </>
        ) : null}
      </Typography>
    </Stack>
  );

  return (
    <Card sx={cardStyle}>
      <CardMedia sx={cardMediaStyle} image={data?.imageUrl} />
      <CachedIcon sx={refreshIconStyle} onClick={refetch} />
      {error ? <ErrorIcon color="error" sx={errorIconStyle} iconButton tooltip={error.message} /> : null}
      <CardContent>
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.title"), (watchFormValue("title") ?? data?.title), <TextField name="title" label={t("Feature.Series.SeriesDetailsCard.title")} defaultValue={data?.title} />)}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.releaseDate"), watchFormValue("releaseDate") ?? format(data?.releaseDate || 0, DEFAULT_DATE_FORMAT), <DateChanger name="releaseDate" label={t("Feature.Series.SeriesDetailsCard.releaseDate")} defaultValue={data?.releaseDate || 0} />)}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.genre"), watchFormValue("genre") ?? (data?.genre || ""), <GenreChanger label={t("Feature.Series.SeriesDetailsCard.genre")} defaultValue={data?.genre} />)}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.originCountry"), watchFormValue("originCountry") ?? (data?.originCountry || ""), <CountryChanger label={t("Feature.Series.SeriesDetailsCard.originCountry")} defaultValue={data?.originCountry} />)}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.originalLanguage"), watchFormValue("originalLanguage") ?? (data?.originalLanguage || ""), <LanguageChanger label={t("Feature.Series.SeriesDetailsCard.originalLanguage")} defaultValue={data?.originalLanguage} />)}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.status"), watchFormValue("status") ?? (data?.status || ""), <StatusChanger label={t("Feature.Series.SeriesDetailsCard.status")} defaultValue={data?.status} />)}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.netProfit"), watchFormValue("netProfit") ?? `${data?.netProfit ?? 0}.$`, <PriceChanger name="netProfit" label={t("Feature.Series.SeriesDetailsCard.netProfit")} defaultValue={data?.netProfit ?? 0} />)}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.revenue"), `${watchFormValue("revenue") ?? data?.revenue ?? 0}.$`, <PriceChanger name="revenue" label={t("Feature.Series.SeriesDetailsCard.revenue")} defaultValue={data?.revenue ?? 0} />)}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.budget"), `${watchFormValue("budget") ?? data?.budget ?? 0}.$`, <PriceChanger name="budget" label={t("Feature.Series.SeriesDetailsCard.budget")} defaultValue={data?.budget ?? 0} />)}
        {renderEditableText(t("Feature.Series.SeriesDetailsCard.plotSummary"), handleOnTruncateText(watchFormValue("plotSummary") ?? (data?.plotSummary || ""), 20), <TextField name="title" label={t("Feature.Series.SeriesDetailsCard.plotSummary")} defaultValue={data?.plotSummary} />)}
      </CardContent>
      <Fade appear={false} in={!!formState.isDirty}>
        <CardActions>
          <Box flex={"1 0 0"} />
          <Button onClick={handleOnCancel} variant="text">
            {t("Feature.Series.SeriesDetailsCard.cancel")}
          </Button>
          <Button onClick={handleSubmitForm(handleOnSave)} loading={isUpdateSeriesLoading} variant="contained" endIcon={<SaveIcon />}>
            {t("Feature.Series.SeriesDetailsCard.save")}
          </Button>
        </CardActions>
      </Fade>
    </Card>
  );
}
