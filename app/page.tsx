"use client";

import Link from "next/link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import SnsApps from "@/components/SnsApps";

export default function Home() {
  return (
    <Container sx={{ py: 8, mt: 8 }} maxWidth="lg">
      <Grid
        container
        sx={{
          position: "relative",
          p: 3,
          color: "#000000",
        }}
      >
        <Grid item xs={12}>
          <Typography
            component="h1"
            variant="h3"
            color="inherit"
            gutterBottom
            align="center"
          >
            Aoi Kurokawa
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Typography
          variant="h4"
          color="inherit"
          paragraph
          sx={{ p: 2, textAlign: "center", width: "100%" }}
        >
          Hi, I&apos;m Aoi. An adventurous traveler, and dog-lover.
        </Typography>
        <Typography variant="h5" color="inherit" paragraph sx={{ p: 2 }}>
          I&apos;m currently a student, studying computer science. I also go by
          Full Stack Developer, Front-End Developer, or Back-End Developer.
        </Typography>
        <Typography variant="h5" color="inherit" paragraph sx={{ p: 2 }}>
          For my personal interest, I like blockchain, web3.0 technologies. I
          have joined some projects such as watch NFT project, video NFT
          project. My task was mainly developing user interface by front-end
          frameworks such as ReactJS, NextJS.
        </Typography>
        <Typography variant="h5" color="inherit" paragraph sx={{ p: 2 }}>
          You can find some projects that I have joined before and my personal
          projects
          <Link
            href="/works"
            style={{
              paddingLeft: "0.5rem",
              textDecoration: "underline",
              color: "#000000",
            }}
          >
            here.
          </Link>
        </Typography>
        <Typography variant="h5" color="inherit" paragraph sx={{ p: 2 }}>
          You can find my resume
          <a
            href="https://github.com/Aoi1011/resume/blob/main/AOI%20KUROKAWA.pdf"
            target="_blank"
            style={{
              paddingLeft: "0.5rem",
              textDecoration: "underline",
              color: "#000000",
            }}
            rel="noreferrer"
          >
            here.
          </a>
        </Typography>
      </Grid>
      <SnsApps />
    </Container>
  );
}
