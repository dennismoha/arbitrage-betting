import { Typography, Divider, Box, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
const Rules = () => {
  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h6">what is happening</Typography>
      <Box> This method best works for draw games</Box>
      <Divider style={{ margin: "10px 0" }} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="h6">
                {" "}
                which combination can guarantee you a win?
              </Typography>
              <Divider />

              <Typography>
                Double chance draws
                <ul>
                  <li>1x vs 1x</li>
                  <li>2x vs 2x</li>
                  <li>1x vs 2x</li>
                  <li>2x vs 1x</li>
                </ul>
              </Typography>
              <Typography>
                The following combination
                <ul>
                  <li>1x vs 2x</li>
                  <li>2x vs 1x</li>
                  <li>2x vs 2x</li>
                  <li>1x vs 1x</li>
                </ul>
                is equivalent to:
                <ul>
                  <li>12 vs 12</li>
                </ul>
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box style={{ borderLeft: "1px solid black" }}>
              <Typography>
                which combinatiion can you use to get safe or reduce chances of
                big loss ?
                <ul>
                  <li>1x vs 1x</li>
                  <li>2x vs 2x</li>
                  <li>1x vs 2x</li>
                  <li>2x vs 1x</li>
                </ul>
              </Typography>
              <Typography>
                which combinatiion can kick you out fast if you followed the
                above?
                <ul>
                  <li>12 vs 12</li>
                </ul>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Rules;
