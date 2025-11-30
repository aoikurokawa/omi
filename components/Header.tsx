"use client";

import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            backgroundColor: "#000000",
            borderBottom: "1px solid",
          }}
        >
          <Grid container spacing={3}>
            <Grid item sm={3} sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5">
                <Link
                  href="/"
                  style={{
                    outline: "none",
                    color: "#ffffff",
                    padding: "1rem",
                    textDecoration: "none",
                  }}
                >
                  OMI Stake
                </Link>
              </Typography>
            </Grid>
            <Grid
              item
              sm={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Typography variant="button">
                <Link
                  href="/workflow"
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                  }}
                >
                  WORKFLOW
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
