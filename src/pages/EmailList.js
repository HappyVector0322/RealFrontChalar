import React, { useEffect, useState } from "react";
import { Grid, Paper, Button, Dialog, FormControl, InputLabel,Select, MenuItem, DialogTitle, DialogContent, DialogActions, Radio, RadioGroup, FormControlLabel, TextField, CircularProgress, Pagination, Container  } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';  
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ArrowRight from "@mui/icons-material/ArrowRight";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Settings from "@mui/icons-material/Settings";
import People from "@mui/icons-material/People";
import Dns from "@mui/icons-material/Dns";
import Checkbox from "@mui/material/Checkbox";
import CommentIcon from "@mui/icons-material/Comment";
import axios from "axios";
import Notification from "../components/Notification";
import SettingDrawer from "../components/SettingDrawer";

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

const useStyles = {
  paper: {
    padding: "16px",
    textAlign: "center",
    color: "black",
  },
};






const apiUrl = process.env.REACT_APP_API_URL;
const CustomizedList = () => {
  const [open, setOpen] = React.useState(true);
  const [notification, setNotification] = useState("");
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(`${apiUrl}/api/email/get-contacts?accessToken=${accessToken}`)
      .then((response) => {
        setContacts(response.data.contacts);
      })
      .catch((error) => {
        setNotification(`Error: ${error?.message || "Unknown error occurred"}`);
      });
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: "dark",
            primary: { main: "#ffffff" },
            background: { paper: "#ff7959" },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: "100%", width: "100%" }}>
          <FireNav component="nav" disablePadding>
            <Divider />
            <ListItem component="div" disablePadding>
              <ListItemButton sx={{ height: 56 }}>
                <ListItemText
                  primary="All contact list"
                  primaryTypographyProps={{
                    color: "primary",
                    fontWeight: "medium",
                    variant: "body2",
                    fontSize: "20px"
                  }}
                />
              </ListItemButton>
              <Tooltip title="Project Settings">
                <IconButton
                  size="large"
                  sx={{
                    "& svg": {
                      color: "rgba(255,255,255,0.8)",
                      transition: "0.2s",
                      transform: "translateX(0) rotate(0)",
                    },
                    "&:hover, &:focus": {
                      bgcolor: "unset",
                      "& svg:first-of-type": {
                        transform: "translateX(-4px) rotate(-20deg)",
                      },
                      "& svg:last-of-type": {
                        right: 0,
                        opacity: 1,
                      },
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      height: "80%",
                      display: "block",
                      left: 0,
                      width: "1px",
                      bgcolor: "divider",
                    },
                  }}
                >
                  <Settings />
                  <ArrowRight
                    sx={{ position: "absolute", right: 4, opacity: 0 }}
                  />
                </IconButton>
              </Tooltip>
            </ListItem>
            <Divider />
            <Box
              sx={{
                bgcolor: open ? "#fffffff2" : null,
                pb: open ? 2 : 0,
                maxHeight: "490px", overflowY:"auto" 
              }}
            >
              <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: open ? 0 : 2.5,
                  "&:hover, &:focus": { "& svg": { opacity: open ? 1 : 0 } },
                }}
              >
                <ListItemText
                  primary="Recipients"
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: "medium",
                    lineHeight: "20px",
                    mb: "2px",
                    color: "#33465b"
                  }}
                  secondary="Name, Company, Email Address"
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: "16px",
                    color: open ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
                  }}
                  sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    opacity: 0,
                    transform: open ? "rotate(-180deg)" : "rotate(0)",
                    transition: "0.2s",
                    color: "#e5764a"
                  }}
                />
              </ListItemButton>
              {open &&
                contacts.map((item) => (
                  <ListItemButton
                    key={item.id}
                    sx={{ py: 0, minHeight: 32, color: "#33465b", "&:hover": { backgroundColor: "#28385514" } }}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      <People />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${item.firstName} ${item.lastName}`}
                      secondary={`${item.company} - ${item.email}`}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                      secondaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                        color: "#33465b"
                      }}
                    />
                  </ListItemButton>
                ))}
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
      <Notification content={notification} />
    </Box>
  );
};

const RightList = (props) => {
  const [checked, setChecked] = useState([]);
  const [nonopeners, SetNonopeners] = useState([]);
  const [notification, setNotification] = useState("");

  const campaignId = props.campaignId;
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(
        `${apiUrl}/api/email/get-non-openers?accessToken=${accessToken}&campaignId=${campaignId}`
      )
      .then((response) => {
        SetNonopeners(response.data);
        const allChecked = response.data.map((_, index) => index);
        setChecked(allChecked);
      })
      .catch((error) => {
        console.log(error);
        setNotification(`Error: ${error?.message || "Unknown error occurred"}`);
      });
  }, [campaignId]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper", maxHeight: "416px", overflowY:"auto"  }}>
      {nonopeners.map((email, index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
          <ListItem key={index} disablePadding>
            <ListItemButton
              role={undefined}
              onClick={handleToggle(index)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(index) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${email}`} />
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>
        );
      })}
      <Notification content={notification} />
    </List>
  );
};

const EmailCampaign = (props) => {
  const [open, setOpen] = React.useState(true);
  const [notification, setNotification] = useState("");
  const [emailcampaigns, SetEmailCampaigns] = useState([]);
  const [campaignStatus, SetCampaignStatus] = useState([]);

  const SetCampaignId = props.SetCampaignId;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    axios
      .get(`${apiUrl}/api/email/get-email-campaigns?accessToken=${accessToken}`)
      .then((response) => {
        console.log(response.data);
        SetEmailCampaigns(response.data.emailCampaigns);
        SetCampaignStatus(response.data.campaignStatus);
      })
      .catch((error) => {
        console.log(error);
        setNotification(`Error: ${error?.message || "Unknown error occurred"}`);
      });
  }, []);

  
  const handleClick = (campaignId) => {
    SetCampaignId(campaignId);
    localStorage.setItem("campaignId", campaignId);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: "dark",
            primary: { main: "#ffffff" },
            background: { paper: "#273343" },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: "100%", width: "100%" }}>
          <FireNav component="nav" disablePadding>
            <Divider />
            <ListItem component="div" disablePadding>
              <ListItemButton sx={{ height: 56 }}>
                <ListItemText
                  primary="Email Campaign list"
                  primaryTypographyProps={{
                    color: "primary",
                    fontWeight: "medium",
                    variant: "body2",
                    fontSize: "20px"
                  }}
                />
              </ListItemButton>
              <Tooltip title="Project Settings">
                <IconButton
                  size="large"
                  sx={{
                    "& svg": {
                      color: "rgba(255,255,255,0.8)",
                      transition: "0.2s",
                      transform: "translateX(0) rotate(0)",
                    },
                    "&:hover, &:focus": {
                      bgcolor: "unset",
                      "& svg:first-of-type": {
                        transform: "translateX(-4px) rotate(-20deg)",
                      },
                      "& svg:last-of-type": {
                        right: 0,
                        opacity: 1,
                      },
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      height: "80%",
                      display: "block",
                      left: 0,
                      width: "1px",
                      bgcolor: "divider",
                    },
                  }}
                >
                  <Settings />
                  <ArrowRight
                    sx={{ position: "absolute", right: 4, opacity: 0 }}
                  />
                </IconButton>
              </Tooltip>
            </ListItem>
            <Divider />
            <Box
              sx={{
                bgcolor: open ? "rgba(71, 98, 130, 0.2)" : null,
                pb: open ? 2 : 0,
                maxHeight: "360px", overflowY:"auto"
              }}
            >
               {/* 
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
              />
             <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: open ? 0 : 2.5,
                  "&:hover, &:focus": { "& svg": { opacity: open ? 1 : 0 } },
                }}
              >
                <ListItemText
                  primary="Email Campaign List"
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: "medium",
                    lineHeight: "20px",
                    mb: "2px",
                  }}
                  secondary="Name, EmailCampaign Id, Campaign Id"
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: "16px",
                    color: open ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
                  }}
                  sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    opacity: 0,
                    transform: open ? "rotate(-180deg)" : "rotate(0)",
                    transition: "0.2s",
                  }}
                />
              </ListItemButton>
              {open &&
                emailcampaigns.map((item, index) => (
                  <ListItemButton
                    key={item.id}
                    sx={{ py: 0, minHeight: 32, color: "rgba(255,255,255,.8)" }}
                    onClick={() => handleClick(item.allEmailCampaignIds)}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      <Dns />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${item.name}`}
                      secondary={`${item.allEmailCampaignIds} - ${
                        item.id
                      } : Opened ${
                        campaignStatus[index].open
                          ? campaignStatus[index].open
                          : "0"
                      } of ${campaignStatus[index].sent}`}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />
                  </ListItemButton>
                ))} */}
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
      <Notification content={notification} />
    </Box>
  );
};

// const CallsList = () => {
//   // Store calls data
//   const [calls, setCalls] = useState([]);
//   // Store any notification/error messages
//   const [notification, setNotification] = useState("");
//   // Cursor for pagination
//   const [after, setAfter] = useState("1");
//   // Flag to know if there's another page
//   const [hasNextPage, setHasNextPage] = useState(false);

//   // Fetch calls from server
//   const fetchCalls = async (cursor = "1") => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const response = await axios.get(
//         `${apiUrl}/api/email/get-calls?accessToken=${accessToken}&after=${cursor}`
//       );

//       // Response should match your posted JSON structure
//       const data = response.data;
//       console.log("Calls Response:", data);

//       // Set the calls array from data.results
//       if (data?.results) {
//         setCalls(data.results);
//       }

//       // Handle the paging info
//       if (data?.paging?.next?.after) {
//         setHasNextPage(true);
//         setAfter(data.paging.next.after);
//       } else {
//         setHasNextPage(false);
//         setAfter("");
//       }
//     } catch (error) {
//       console.error("Error fetching calls:", error);
//       setNotification(`Error: ${error.message || "Unknown error occurred"}`);
//     }
//   };


  
//   // Fetch on component mount
//   useEffect(() => {
//     fetchCalls();
//   }, []);

//   // Handler for going to the next page
//   const handleNextPage = () => {
//     if (hasNextPage && after) {
//       fetchCalls(after);
//     }
//   };

//   return (
//     <Grid item xs={12} sm={6} md={6}>
//       <Paper sx={{ height: "100%", p: 2 }}>
//         <h1 className="mt-5 text-2xl font-bold mb-5">Call Campaigns</h1>
        
//         {/* Display notification if any */}
//         {notification && <p style={{ color: "red" }}>{notification}</p>}

//         {/* List out the calls */}
//         {calls.map((call) => {
//           const { id, properties, createdAt } = call;
//           const recordingUrl = properties?.hs_call_recording_url || "N/A";

//           return (
//             <div key={id} style={{ marginBottom: "1rem" }}>
//               <p><strong>ID:</strong> {id}</p>
//               <p><strong>Recording URL:</strong> {recordingUrl}</p>
//               <p><strong>Created At:</strong> {createdAt}</p>
//               <hr />
//             </div>
//           );
//         })}

//         {/* Next-Page Button (cursor-based) */}
//         {hasNextPage && (
//           <Button variant="contained" onClick={handleNextPage}>
//             Next Page
//           </Button>
//         )}
//       </Paper>
//     </Grid>
//   );
// };


const CallsList = () => {
  // Stores the current page number displayed in the pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [transcriptions, setTranscriptions] = useState({});
  const [loadingTranscription, setLoadingTranscription] = useState({});
  // Calls for the *current* page
  const [openDialog, setOpenDialog] = useState(false);  
  const [chalaraccessToken, setChalarAccessToken] = useState("eyJhY2Nlc3MtdG9rZW4iOiJIZ0xmaXFfUWQ3ZXNNWDJSaDItU3RnIiwidG9rZW4tdHlwZSI6IkJlYXJlciIsImNsaWVudCI6ImpodEVmeU92SGRnVWxmSXRKaHhFOFEiLCJleHBpcnkiOiI0ODk1MTA4NDk3IiwidWlkIjoibWFjYXJpb2ZlbGl4ZGVAZ21haWwuY29tIn0=");
  
  const [queryType, setQueryType] = useState('instant');  
  const [language, setLanguage] = useState('en');  



  const [calls, setCalls] = useState([]);

  // Notification/error message
  const [notification, setNotification] = useState("");

  // This array keeps track of the 'after' cursor for each page:
  //   pageCursors[1] -> after-cursor for page 1, etc.
  // The *first* page's cursor is an empty string (HubSpot uses undefined to indicate the first page).
  const [pageCursors, setPageCursors] = useState(["1"]);

  // Keep track of how many pages we've actually fetched. This will be our
  // "maximum" visible page number in the Pagination component.
  const [maxLoadedPage, setMaxLoadedPage] = useState(10);

  // If we ever discover that a page has no .paging.next,
  // we know there's no more pages beyond it.
  const [lastPageReached, setLastPageReached] = useState(false);

  // Fetch calls from our server (which proxies HubSpot)
  // pageIndex is the page number (1-based)
  // afterCursor is the "after" param to pass to HubSpot
  const handleDialogOpen = () => {  
    setOpenDialog(true);  
  };  

  const handleDialogClose = () => {  
    setOpenDialog(false);  
  };  

  const handleFetchData = () => {  
    // Here you'd handle the API call with the inputted access token, query type, and language  
    console.log('Access Token:', chalaraccessToken);  
    console.log('Query Type:', queryType);  
    console.log('Language:', language);  
    handleDialogClose();  
  };  

  const fetchPage = async (pageIndex, afterCursor) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${apiUrl}/api/email/get-calls?accessToken=${accessToken}&after=${afterCursor}`
      );
      const data = response.data;

      // Update calls for this page
      setCalls(data.results || []);

      // Check if there's a next page
      if (data?.paging?.next?.after) {
        // If pageIndex is the new max page, store its 'after' in pageCursors
        // (the cursor for the *next* page).
        const newAfterCursor = data.paging.next.after;
        // We only update if we haven't already recorded a cursor for the next page
        if (!pageCursors[pageIndex]) {
          const updatedCursors = [...pageCursors];
          updatedCursors[pageIndex] = newAfterCursor; // pageIndex is next page's index in 1-based
          setPageCursors(updatedCursors);
        }

        // We can load more pages in the future
        setLastPageReached(false);
      } else {
        // No next page => set the flag
        setLastPageReached(true);
      }

      // Mark that we've loaded at least up to this page
      if (pageIndex > maxLoadedPage) {
        setMaxLoadedPage(pageIndex);
      }
    } catch (error) {
      console.error("Error fetching calls:", error);
      setNotification(
        `Error: ${error?.response?.data?.error || error.message || "Unknown error"}`
      );
    }
  };

  // On first render, load page 1
  useEffect(() => {
    // page 1 uses pageCursors[0], which is "" initially
    fetchPage(1, pageCursors[0]);
    // eslint-disable-next-line
  }, []);

  // Whenever the user changes the page, we need to fetch calls for that page
  // -- But if we haven't loaded that page yet (i.e. we don't have its cursor),
  // we need to load intermediate pages as well (in case user jumps from page 1 to page 5).
  const handlePageChange = async (event, newPage) => {
    // If we already loaded that page, we can directly fetch with the known cursor
    if (pageCursors[newPage - 1] !== undefined) {
      setCurrentPage(newPage);
      const afterCursor = pageCursors[newPage - 1] || "";
      fetchPage(newPage, afterCursor);
    } else {
      // We haven't loaded an intermediate page yet, so we fetch them in sequence
      // from `currentPage` up to `newPage` (or from `maxLoadedPage` up to `newPage`).
      // For performance, you might want to do this differently, or disable jumping forward too far.
      let pageToFetch = maxLoadedPage;
      while (pageToFetch < newPage) {
        const afterCursor = pageCursors[pageToFetch - 1] || "";
        // We fetch the next page (pageToFetch + 1)
        await fetchPage(pageToFetch + 1, afterCursor);
        pageToFetch++;
        // If we reach a last page, break early
        if (lastPageReached) break;
      }
      // After loading, we set currentPage = newPage (or the last page if we overshoot)
      const finalPage = lastPageReached && pageToFetch < newPage ? pageToFetch : newPage;
      setCurrentPage(finalPage);
    }
  };

  // Let's define how many pages to show in the Pagination component.
  // We only know how many pages we have loaded so far: maxLoadedPage.
  // If lastPageReached is false, we can keep showing more pages (effectively "infinite").
  // However, for demonstration, we'll limit the max pages displayed, e.g., 50.
  const totalPagesToShow = lastPageReached ? maxLoadedPage : Math.min(maxLoadedPage + 5, 50);

  const transcribeCall = async (callId, recordingUrl) => {
    if (!recordingUrl) {
      setNotification("No recording URL available for transcription.");
      return;
    }

    setLoadingTranscription((prev) => ({ ...prev, [callId]: true }));

    let languageCode;  
    switch (language.toLowerCase()) {  
      case 'english':  
        languageCode = 'en';  
        break;  
      case 'russian':  
        languageCode = 'ru';  
        break;  
      default:  
        languageCode = 'en'; // Default to English if no match  
    }  

    try {
      const response = await axios.post(`${apiUrl}/api/email/transcribe`, {
        filePath: recordingUrl,  // You may need to adjust this depending on how the backend expects the file
        settings: {
          diarization: true,   // Assuming you want diarization
          check_speech: true,  // Assuming speech checking is enabled
          language: languageCode,      // Set to the appropriate language
        },
      });
      
      const transcriptionSegments = response.data.transcription || [];  
    
    // Extract and aggregate all text strings from the transcription  
      const transcriptionText = transcriptionSegments.map(segment => segment.text).join(' ');  

      setTranscriptions((prev) => ({
        ...prev,
        [callId]: transcriptionText  || "Transcription unavailable",
      }));
      console.log(`Transcription for call ID ${callId}: ${response.data.transcription.text}`);  
    } catch (error) {
      console.error("Transcription error:", error);
      setNotification(`Error: ${error.response?.data?.error || "Failed to transcribe."}`);
    } finally {
      setLoadingTranscription((prev) => ({ ...prev, [callId]: false }));
    }
  };

  return (
    <Grid item xs={12} sm={12} md={12}>
      <Paper sx={{ height: "100%", p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">  
          <h1 className="mt-5 text-2xl font-bold mb-5">Call Campaigns</h1>  
          <IconButton color="secondary" onClick={handleDialogOpen}>  
            <SettingsIcon />  
          </IconButton>  
        </Box>  
  

        <Dialog open={openDialog} onClose={handleDialogClose} sx={{ '& .MuiDialog-paper': { width: '600', height: '300' } }}>  
          <DialogTitle>Configure API Request</DialogTitle>  
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>  
            <TextField  
              margin="dense"  
              label="Access Token"  
              fullWidth  
              variant="standard"  
              value={chalaraccessToken}  
              onChange={(e) => setChalarAccessToken(e.target.value)}  
            />  
            <RadioGroup  
              row  
              value={queryType}  
              onChange={(e) => setQueryType(e.target.value)}  
            >  
              <FormControlLabel value="instant" control={<Radio />} label="Instant Query" />  
              <FormControlLabel value="process" control={<Radio />} label="Process Query" />  
              <FormControlLabel value="other" control={<Radio />} label="Other Query" />  
            </RadioGroup>  
            <FormControl fullWidth variant="standard">  
              <InputLabel>Language</InputLabel>  
              <Select  
                value={language}  
                onChange={(e) => setLanguage(e.target.value)}  
                label="Language"  
              >  
                <MenuItem value="en">English</MenuItem>  
                <MenuItem value="ru">Russian</MenuItem>  
              </Select>  
            </FormControl>  
          </DialogContent>  
          <DialogActions>  
            <Button onClick={handleDialogClose} color="primary">  
              Cancel  
            </Button>  
            <Button onClick={handleFetchData} color="primary">  
              Submit  
            </Button>  
          </DialogActions>  
        </Dialog>  
        
        {/* Show notifications or errors */}
        {notification && <p style={{ color: "red" }}>{notification}</p>}
 
        {/* List the calls for the current page */}
        {calls.map((call) => {
          const { id, properties, createdAt } = call;
          const transcriptionText = transcriptions[id] || "Transcription not available";
        
          const recordingUrl = properties?.hs_call_recording_url || "N/A";
          return (
            <Box key={id} mb={2} sx={{ borderBottom: "1px solid #ccc", pb: 1 }}>
              <p><strong>ID:</strong> {id}</p>
              {recordingUrl ? (
                <audio controls src={recordingUrl} style={{ width: "100%" }}>
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <p style={{ color: "red" }}>No recording URL available.</p>
              )}

              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => transcribeCall(id, recordingUrl)}
                  disabled={loadingTranscription[id]}
                >
                  {loadingTranscription[id] ? <CircularProgress size={24} /> : "Transcribe"}
                </Button>
              </Box>
               <Box mt={2}>
                <p><strong>Transcription:</strong></p>
                <Paper variant="outlined" sx={{ p: 1 }}>
                  {transcriptionText}
                </Paper>
              </Box>
              <p><strong>Created At:</strong> {createdAt}</p>
            </Box>
          );
        })}

        {/* 
          Render numeric pagination. 
          - page: currentPage is 1-based
          - count: totalPagesToShow is how many pages we can show 
          - onChange triggers handlePageChange
        */}
        <Pagination
          page={currentPage}
          count={totalPagesToShow}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
          sx={{ mt: 2 }}
        />
      </Paper>
    </Grid>
  );
};



const Campaign = () => {
  const [notification, setNotification] = useState("");
  const [campaign, setCampaign] = useState([]);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    axios
      .get(`${apiUrl}/api/email/get-campaigns?accessToken=${accessToken}`)
      .then((response) => {
        setCampaign(response.data);
      })
      .catch((error) => {
        console.log(error);
        setNotification(`Error: ${error?.message || "Unknown error occurred"}`);
      });
  }, []);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper", maxHeight: "416px", overflowY:"auto" }}>
      {campaign.map((contact, index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
          <ListItem key={index} disablePadding>
            <ListItemButton
              role={undefined}
              onClick={handleToggle(index)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(index) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={`${contact.id} ${contact.appId} ${contact.appName}`}
              />
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>
        );
      })}
      <Notification content={notification} />
    </List>
  );
};

function EmailList() {
  const classes = useStyles;
  const [notification, setNotification] = useState("");
  const [campaignId, SetCampaignId] = useState(
    localStorage.getItem("campaignId")
  );
  const setSchedule = (campaignId) => {
    console.log(campaignId);
  };
  useEffect(() => {
    console.log("sqqweqweqwe");
    axios
      .get(`${apiUrl}/api/auth/reauthorize`)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("accessToken", response.data);
      })
      .catch((error) => {
        console.log(error);
        setNotification(`Error: ${error?.message || "Unknown error occurred"}`);
      });
  }, [campaignId]);

  return (
    <div className="flex-1 bg-[#f5f8fa]">
      <Container sx={{ padding: "4rem" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <Paper style={classes.paper}>
              <h1 className="mt-5 text-2xl font-bold mb-5">Contact List</h1>
              <CustomizedList />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Paper style={classes.paper} sx={{height:"100%", display: "flex", flexDirection:"column", justifyContent:"space-between"}}>
              <h1 className="mt-5 text-2xl font-bold mb-5">Caller Lists</h1>
              <RightList campaignId={campaignId} />
              <SettingDrawer/>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ marginTop: "20px" }}>
              <CallsList/>
        {/* <Grid item xs={12} sm={6} md={6} >
            <Paper style={classes.paper} sx={{height:"100%"}}>
              <h1 className="mt-5 text-2xl font-bold mb-5">
                Mail Campaign List
              </h1>
              <EmailCampaign SetCampaignId={SetCampaignId} />
            </Paper>
          </Grid>
         <Grid item xs={12} sm={6} md={6}>
            <Paper style={classes.paper}>
              <h1 className="mt-5 text-2xl font-bold mb-5">Campaign Lists</h1>
              <Campaign />
            </Paper>
          </Grid>  */}
        </Grid>
      </Container>
      <Notification content={notification} />
    </div>
  );
}

export default EmailList;
