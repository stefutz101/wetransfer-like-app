'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Terms() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Typography component="h1" variant="h4">
          Terms of Service
        </Typography>
        <Typography component="p" variant="p">
          WeMove offers tools to move ideas, such as:
        </Typography>
        <List
          sx={{ listStyle: 'disc', pl: 4 }}
        >
          <ListItemText sx={{ display: 'list-item' }}>a service to share files (WeMove File Sharing”);</ListItemText>
          <ListItemText sx={{ display: 'list-item' }}>a free (online) magazine (“WePresent”);</ListItemText>
          <ListItemText sx={{ display: 'list-item' }}>a service that allows you to store, organize, share and receive content from multiple sources (“Collect”);</ListItemText>
          <ListItemText sx={{ display: 'list-item' }}>a service that allows you to capture your ideas through sketches, notes and images (“Paper”);</ListItemText>
          <ListItemText sx={{ display: 'list-item' }}>a service that allows you to present your ideas (“Paste”);</ListItemText>
          <ListItemText sx={{ display: 'list-item' }}>additional features and functionalities.</ListItemText>
        </List>
        <Typography component="p" variant="p" paragraph="True">
          Your use of and access to our services, software, websites (including browser extensions) and/or applications (together: “Services”) are governed by these Terms of Service (“Terms”).
        </Typography>
        <Typography component="p" variant="p" paragraph="True">
          The Services may be provided to you online, in the form of a mobile and/or desktop application(s) and/or may be integrated in a third party service.
        </Typography>
        <Typography component="p" variant="p" paragraph="True">
          The Services allow you to upload, submit, store, share, receive, collect, capture and/or visualize your ideas, texts, graphics, videos, data, information, files, presentation decks or other content, including third party content used by you (together: “Content”). You retain all rights in- and responsibility and liability for all Content.
        </Typography>
        <Typography component="p" variant="p" paragraph="True">
          WeMove does not claim ownership of your Content. The Services are provided to you as the user of the Services by WeMove B.V. (WeMove, “We”), with its main office at Willem Fenengastraat 19, 1096 BL Amsterdam, the Netherlands, registered at the Dutch Chamber of Commerce under 34380998.
        </Typography>
        <Typography component="p" variant="p" paragraph="True">
          WeMove does not claim ownership of your Content. The Services are provided to you as the user of the Services by WeMove B.V. (WeMove, “We”), with its main office at Willem Fenengastraat 19, 1096 BL Amsterdam, the Netherlands, registered at the Dutch Chamber of Commerce under 34380998.
        </Typography>
        <List
          sx={{ listStyle: "decimal", pl: 4 }}
        >
          <ListItemText sx={{ display: 'list-item' }}>
            <Typography component="h1" variant="h5">
              Applicability
            </Typography>
            <List
              sx={{ listStyle: 'decimal', pl: 4 }}
            >
              <ListItemText sx={{ display: 'list-item' }}>
                <Typography component="p" variant="p">
                  You are only allowed to use the Services when aged 16 or older.
                </Typography>
              </ListItemText>
              <ListItemText sx={{ display: 'list-item' }}>
                <Typography component="p" variant="p">
                  Please read the Terms carefully. By using the Services (directly with us or through a third party application, plug-in, extension or integration) you agree and accept these Terms and our Notice and Take Down Policy (“NTD Policy”). To the use of personal data and cookies in relation to the Services our Privacy & Cookie Statement applies.
                </Typography>
              </ListItemText>
              <ListItemText sx={{ display: 'list-item' }}>
                <Typography component="p" variant="p">
                  If the Services include, are used in connection with, or are integrated in the services of third parties, the terms and conditions, notice and take down policies and/or privacy and cookie policies of those third parties may apply in addition to these Terms. If you are using the Services on behalf of your employer or another organization, you are agreeing to the terms of that organization and you represent and warrant that you have the authority to do so. WeTransfer is not responsible for any third party services, terms and/or policies.
                </Typography>
              </ListItemText>
              <ListItemText sx={{ display: 'list-item' }}>
                <Typography component="p" variant="p">
                  If you want to file a complaint or notice about unlawful Content being stored or shared via the Services or the WeMove API, please read our NTD Policy.
                </Typography>
              </ListItemText>
              <ListItemText sx={{ display: 'list-item' }}>
                <Typography component="p" variant="p">
                  If you become aware of a vulnerability in any of the Services, please read our Responsible Disclosure Policy.
                </Typography>
              </ListItemText>
              <ListItemText sx={{ display: 'list-item' }}>
                <Typography component="p" variant="p">
                  If you want to use the WeMove API (as described in the API Terms of Use) our API Terms of Use apply in addition to these Terms.
                </Typography>
              </ListItemText>
              <ListItemText sx={{ display: 'list-item' }}>
                <Typography component="p" variant="p">
                  WeMove can amend the Terms from time to time. The amended Terms will become effective upon them being posted on WeMove’s website(s) and/or on WeTransfer’s mobile and/or desktop application(s), or at such later date as may be stated on the amended Terms. Therefore, we recommend that you review the Terms from time to time and take note of any changes. By continuing your use of the Services you accept the amended Terms. In case of material changes to the Terms, you will be informed prior to the change: (i) at the moment you use the Services, or (ii) by a message to the contact details you provided to us, or (iii) by a posting of the notice of the change on WeTransfer’s website(s) and/or on WeTransfer’s mobile and/or desktop application(s). In the event you don’t accept a change you can cancel your subscription.
                </Typography>
              </ListItemText>
              <ListItemText sx={{ display: 'list-item' }}>
                <Typography component="p" variant="p">
                  These Terms supersede any and all prior oral and written quotations, terms, communications, agreements and understandings between you and WeMove.
                </Typography>
              </ListItemText>
              <ListItemText sx={{ display: 'list-item' }}>
                <Typography component="p" variant="p">
                  The following parts of these Terms apply to specific Services only:
                </Typography>
                <List
                  sx={{ listStyle: "disc", pl: 4 }}
                >
                  <ListItemText sx={{ display: 'list-item' }}>
                    <Typography component="p" variant="p">
                      Clause 2: WeTransfer File Sharing;
                    </Typography>
                  </ListItemText>
                  <ListItemText sx={{ display: 'list-item' }}>
                    <Typography component="p" variant="p">
                      Clause 3: WePresent;
                    </Typography>
                  </ListItemText>
                  <ListItemText sx={{ display: 'list-item' }}>
                    <Typography component="p" variant="p">
                      Clause 4: Collect;
                    </Typography>
                  </ListItemText>
                  <ListItemText sx={{ display: 'list-item' }}>
                    <Typography component="p" variant="p">
                      Clause 5: Paper;
                    </Typography>
                  </ListItemText>
                  <ListItemText sx={{ display: 'list-item' }}>
                    <Typography component="p" variant="p">
                      Clause 6: Paste;
                    </Typography>
                  </ListItemText>
                  <ListItemText sx={{ display: 'list-item' }}>
                    <Typography component="p" variant="p">
                      Clause 7 and 8: all paid subscription Services;
                    </Typography>
                  </ListItemText>
                  <ListItemText sx={{ display: 'list-item' }}>
                    <Typography component="p" variant="p">
                      Clause 9: WeTransfer Teams;
                    </Typography>
                  </ListItemText>
                </List>
              </ListItemText>
            </List>
            <Typography component="p" variant="p" paragraph="True">
              All other clauses apply to all Services.
            </Typography>
          </ListItemText>
          <ListItemText sx={{ display: 'list-item' }}>
            <Typography component="h1" variant="h5">
              WeMove File Sharing
            </Typography>
          </ListItemText>
          <ListItemText sx={{ display: 'list-item' }}>
            <Typography component="h1" variant="h5">
              WePresent
            </Typography>
          </ListItemText>
          <ListItemText sx={{ display: 'list-item' }}>
            <Typography component="h1" variant="h5">
              Collect
            </Typography>
          </ListItemText>
          <ListItemText sx={{ display: 'list-item' }}>
            <Typography component="h1" variant="h5">
              Paper
            </Typography>
          </ListItemText>
          <ListItemText sx={{ display: 'list-item' }}>
            <Typography component="h1" variant="h5">
              Paste
            </Typography>
          </ListItemText>
          <ListItemText sx={{ display: 'list-item' }}>
            <Typography component="h1" variant="h5">
              Payment conditions
            </Typography>
          </ListItemText>
          <ListItemText sx={{ display: 'list-item' }}>
            <Typography component="h1" variant="h5">
              Term and cancellation of a subscription
            </Typography>
          </ListItemText>
          <ListItemText sx={{ display: 'list-item' }}>
            <Typography component="h1" variant="h5">
              WeTransfer Teams - Payment, term and cancellation
            </Typography>
          </ListItemText>
          <ListItemText sx={{ display: 'list-item' }}>
            <Typography component="h1" variant="h5">
              Content ownership, permissions and responsibility
            </Typography>
          </ListItemText>
          <ListItemText sx={{ display: 'list-item' }}>
            <Typography component="h1" variant="h5">
              Restrictions
            </Typography>
          </ListItemText>
          <ListItemText sx={{ display: 'list-item' }}>
            <Typography component="h1" variant="h5">
              Violation of the Terms of Service
            </Typography>
          </ListItemText>
          <ListItemText sx={{ display: 'list-item' }}>
            <Typography component="h1" variant="h5">
              Intellectual property rights
            </Typography>
          </ListItemText>
          <ListItemText sx={{ display: 'list-item' }}>
            <Typography component="h1" variant="h5">
              Disclaimer and account registration
            </Typography>
          </ListItemText>
          <ListItemText sx={{ display: 'list-item' }}>
            <Typography component="h1" variant="h5">
              Indemnity and Liability
            </Typography>
          </ListItemText>
          <ListItemText sx={{ display: 'list-item' }}>
            <Typography component="h1" variant="h5">
              Waiver, Severability & Assignment
            </Typography>
          </ListItemText>
          <ListItemText sx={{ display: 'list-item' }}>
            <Typography component="h1" variant="h5">
              Applicable law and Jurisdiction
            </Typography>
          </ListItemText>
          <ListItemText sx={{ display: 'list-item' }}>
            <Typography component="h1" variant="h5">
              Contact
            </Typography>
          </ListItemText>
        </List>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}