import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Authenticator } from "aws-amplify-react";
import styled from "@emotion/styled";
import logoPath from "./assets/logo.svg";

import awsExports from "./aws-exports";
import Screens from "./components/Screens";
import nodeNotifier from "node-notifier";

const Title = styled("h1")`
  font-family: "Quicksand", sans-serif;
  font-size: 2.2em;
  color: var(--sizzling-red);
`;

const Logo = styled("img")`
  height: 40px;
  margin-right: 10px;
`;

const Header = styled("header")`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const theme = {
  formContainer: {
    margin: 0,
    padding: "8px 24px 24px",
  },
  formSection: {
    backgroundColor: "#ffffff",
    borderRadius: "4px",
  },
  sectionHeader: {
    color: "#000",
  },
  sectionFooterSecondaryContent: {
    color: "#303952",
  },
  inputLabel: {
    color: "#000",
  },
  input: {
    backgroundColor: "#ffebed",
    border: 0,
    color: "#000",
  },
  hint: {
    color: "#000",
  },
  button: {
    borderRadius: "3px",
    backgroundColor: "#FF495C",
  },
  a: {
    color: "#FF495C",
  },
  toast: {
    top: "auto",
    bottom: "0",
    backgroundColor: "#FF495C",
  },
};

function App() {
  const [state, setState] = useState({ isLoggedIn: false, user: null });

  const checkLoggedIn = () => {
    Auth.currentAuthenticatedUser()
      .then((data) => {
        const user = { username: data.username, ...data.attributes };
        setState({ isLoggedIn: true, user });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return state.isLoggedIn ? (
    <Screens />
  ) : (
    <>
      <Header>
        <Logo src={logoPath} />
        <Title>selphy</Title>
      </Header>
      <Authenticator
        onStateChange={(authState) => {
          if (authState === "signedIn") {
            checkLoggedIn();
          }
        }}
        amplifyConfig={awsExports}
        theme={theme}
      />
    </>
  );
}

export default App;
