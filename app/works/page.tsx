"use client";

import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { FaGithub } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import data from "@/data/worksData.json";

export default function Works() {
  const router = useRouter();

  return (
    <Container sx={{ py: 8, mt: 8 }} maxWidth="lg">
      <Grid container spacing={4}>
        {data.map((d) => (
          <Grid item key={d.id} xs={12} sm={6} md={6}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                sx={{ height: "293px" }}
                image={d.image}
                alt={d.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {d.title}
                </Typography>
                <Typography>{d.description}</Typography>
              </CardContent>
              <CardActions>
                {d.githubLink && (
                  <Link href={d.githubLink} target="_blank">
                    <Button size="large">
                      <FaGithub />
                    </Button>
                  </Link>
                )}
                {d.detailLink && (
                  <Link href={d.detailLink} target="_blank">
                    <Button size="large">
                      <BiDetail />
                    </Button>
                  </Link>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid
        sx={{ paddingTop: "5rem", display: "flex", justifyContent: "center" }}
      >
        <Button onClick={() => router.push("/")}>Back to home</Button>
      </Grid>
    </Container>
  );
}
