import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
export default function DenseAppBar({ theme, data }) {
  console.log("Data in DenseAppBar:", data);

  return (
    <Box sx={{ flexGrow: 1, width: 1400 }}>
      {data && data.length > 0 ? (
        data.map((item, index) => (
          <AppBar
            key={index}
            position="static"
            sx={{
              backgroundColor: "transparent",
              boxShadow: "none",
              borderBottom:
                theme === "Light Theme"
                  ? "1px solid black"
                  : "1px solid #2596be",
              paddingLeft: { xs: "10px", md: "20px" }, // Adjust left padding
              paddingRight: { xs: "10px", md: "20px" }, // Adjust right padding
              marginBottom: 2,
              maxWidth: { xs: "25%", md: "90%" }, // Adjust max width to reduce line length
              margin: "0 auto", // Center the AppBar horizontally
            }}
          >
            <Toolbar
              variant="dense"
              sx={{
                justifyContent: "space-between",
                display: "flex", // Always display as flex
                flexDirection: { xs: "column", md: "row" }, // Column for mobile, row for larger screens
              }}
            >
              <Typography
                variant="h6"
                color="inherit"
                component="div"
                sx={{
                  color: theme === "Light Theme" ? "black" : "#2596be",
                  borderColor: theme === "Light Theme" ? "black" : "#2596be",
                  paddingRight: { xs: "0px", md: "70px" },
                  margin: { xs: "20px 0", md: "40px" },
                  width: { xs: "100%", md: "auto" }, // Ensure full width on mobile
                  textAlign: { xs: "center", md: "left" }, // Center text on mobile view
                  wordBreak: "break-word",
                  overflow: "hidden", // Prevent overflow
                  fontSize: {
                    xs: item.span_text.length > 20 ? "0.75rem" : "1.25rem", // Adjust font size for mobile view
                    md: "1.25rem", // Default font size for larger screens
                  },
                }}
              >
                {item.span_text}
              </Typography>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <Typography variant="body1" color="inherit">
                  <Button
                    sx={{
                      color: theme === "Light Theme" ? "black" : "#2596be",
                      borderColor:
                        theme === "Light Theme" ? "black" : "#2596be",
                      paddingLeft: "70px",
                      paddingRight: "70px",
                      margin: { xs: "10px 0", md: "40px" }, // Adjust margin for mobile view only
                    }}
                    variant="outlined"
                    onClick={() =>
                      window.open(item.credential_certification_url, "_blank")
                    }
                  >
                    View Credentials
                  </Button>
                </Typography>
              </IconButton>
            </Toolbar>
          </AppBar>
        ))
      ) : (
        <Box>
          <Typography variant="body1" color="inherit">
            Loading...
          </Typography>
        </Box>
      )}
    </Box>
  );
}
