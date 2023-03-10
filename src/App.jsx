import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { loadHyper } from "@juspay-tech/hyper-js";
import { Elements } from "@juspay-tech/react-hyper-js";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CheckoutForm from "./CheckoutForm";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import "./App.css";

const stripePromise = loadHyper("pk_snd_1e5425f5dea94ee793cf34ea326294d8");

const useStyles = (theme) =>
  makeStyles(() => ({
    selected: {
      color: theme === "midnight" || theme === "soft" ? "#FFFFFF" : "#000000",
      borderBottom:
        theme === "midnight" || theme === "soft"
          ? "2px solid white"
          : "2px solid black",
      "& .MuiSvgIcon-root": {
        color: theme === "midnight" || theme === "soft" ? "#FFFFFF" : "#000000",
      },
    },
  }));

export default function App() {
  const [clientSecret, setClientSecret] = useState(
    "pay_e6B1fTGHzVu8fEj5kBhj_secret_Nb56qhqYM0EI2BxXJBYH"
  );
  const [theme, setTheme] = React.useState("default");
  const [locale, setLocale] = React.useState("");
  const [layout, setLayout] = React.useState("tabs");
  const [themeValues] = React.useState([
    "Default",
    "Brutal",
    "Midnight",
    "Soft",
    "None",
    "Charcoal",
  ]);
  const [layoutValues] = React.useState(["Tabs", "Accordion", "Spaced"]);
  const [selectedTheme, setSelectedTheme] = useState("Default");
  const [selectedLayout, setSelectedLayout] = useState("Tabs");
  const styles = useStyles(theme)();

  const darkTheme = createTheme({
    palette: {
      mode:
        theme === "midnight" || theme === "soft" || theme === "flat"
          ? "dark"
          : "light",
    },
    typography: {
      fontFamily: "Poppins",
    },
  });
  const handleThemeChange = (event) => {
    setTheme(event.target.value.toLowerCase());
    setSelectedTheme(event.target.value);
  };

  const handleLayoutChange = (event) => {
    setLayout(event.target.value.toLowerCase());
    setSelectedLayout(event.target.value);
  };

  let options = {
    clientSecret,
    appearance: {
      theme: theme,
    },
    fonts: [
      {
        cssSrc:
          "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap",
      },
      {
        cssSrc:
          "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Qwitcher+Grypen:wght@400;700&display=swap",
      },
      {
        cssSrc: "https://fonts.googleapis.com/css2?family=Combo&display=swap",
      },
      {
        family: "something",
        src: "https://fonts.gstatic.com/s/combo/v21/BXRlvF3Jh_fIhj0lDO5Q82f1.woff2",
        weight: "700",
      },
    ],
    locale: locale,
    loader: "always",
  };

  let layout1 = {
    type: layout === "spaced" ? "accordion" : layout,
    defaultCollapsed: false,
    radios: true,
    spacedAccordionItems: layout === "spaced",
  };
  const options1 = {
    fields: {
      billingDetails: {
        address: {
          country: "auto",
          city: "auto",
        },
      },
    },
    layout: layout1,
    // paymentMethodOrder: ["cards", "klarna"],
  };

  document.body.style.background =
    options.appearance.theme === "flat"
      ? "#030304f5"
      : options.appearance.theme === "midnight"
      ? "#1a1f36"
      : options.appearance.theme === "soft"
      ? "#3e3e3e"
      : options.appearance.theme === "brutal"
      ? "#7cff708a"
      : "#ddd8d812";

  var elements = (
    <div>
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm
          locale={options.locale}
          options1={options1}
          layout={layout}
          setLayout={setLayout}
        />
      </Elements>
    </div>
  );

  return (
    <div>
      {clientSecret && (
        <div>
          <ThemeProvider theme={darkTheme}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    marginRight: "10px",
                    fontWeight: "bold",
                  }}
                  className={styles.selected}
                >
                  {"Theme -"}
                </div>
                <FormControl>
                  <Select
                    value={selectedTheme}
                    onChange={handleThemeChange}
                    className={styles.selected}
                    inputProps={{
                      name: "theme",
                      id: "theme",
                    }}
                  >
                    {themeValues.map((value, index) => {
                      return (
                        <MenuItem key={index} value={value}>
                          {value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    marginRight: "10px",
                    fontWeight: "bold",
                  }}
                  className={styles.selected}
                >
                  {"Layout -"}
                </div>
                <FormControl>
                  <Select
                    value={selectedLayout}
                    onChange={handleLayoutChange}
                    className={styles.selected}
                    inputProps={{
                      name: "layout",
                      id: "layout",
                    }}
                  >
                    {layoutValues.map((value, index) => {
                      return (
                        <MenuItem key={index} value={value}>
                          {value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            </div>

            {theme === "default" && elements}
            {theme === "brutal" && elements}
            {theme === "midnight" && elements}
            {theme === "soft" && elements}
            {theme === "charcoal" && elements}
            {theme === "none" && elements}

            {/* {locale === "ar" && elements}
            {locale === "ja" && elements}
            {locale === "auto" && elements} */}
          </ThemeProvider>
        </div>
      )}
    </div>
  );
}
