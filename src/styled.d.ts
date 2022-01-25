import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    mainBgColor: string;
    fontColor: string;
    btnFontColor: string;
    formBgColor: string;
    formBorderColor: string;
    formFontColor: string;
    tabBarBtnColor: string;
    tabBarBrodrColor: string;
    likeHeartColor: string;
    BLUE: {
      BLUE_0: string;
    };
  }
}
