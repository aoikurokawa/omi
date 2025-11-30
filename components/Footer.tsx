"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Copyright() {
  return (
    <Typography variant="body2" align="center" sx={{ color: "#fff" }}>
      {"Copyright © "}
      <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
        AOI
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

interface FooterProps {
  description: string;
  title: string;
}

export default function Footer(props: FooterProps) {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#000",
        py: 6,
        position: "fixed",
        bottom: 0,
        width: "100%",
        textAlign: "center",
        padding: "2.5rem",
      }}
    >
      <Copyright />
    </Box>
  );
}
