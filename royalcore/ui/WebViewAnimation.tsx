import { WebView } from 'react-native-webview';
import React from 'react';
import { Dimensions, View } from 'react-native';

const ANIMATION_HTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      width: 100%;
      height: 100%;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .loading-bar {
      position: relative;
      width: 110px;
      height: 110px;
      background: transparent;
      border: 1px solid #3c3c3c;
      border-radius: 50%;
      text-align: center;
      line-height: 111px;
      font-family: sans-serif;
      font-size: 15px;
      color: #fff000;
      letter-spacing: 3px;
      text-transform: uppercase;
      text-shadow: 0 0 20px #fff000;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }

    .loading-bar:before {
      content: "";
      position: absolute;
      top: -3px;
      left: -3px;
      width: 100%;
      height: 100%;
      border: 3px solid transparent;
      border-top: 5px solid #fff000;
      border-right: 5px solid #fff000;
      border-radius: 50%;
      animation: animateC 2s linear infinite;
    }

    @keyframes animateC {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  </style>
</head>
<body>
  <div class="loading-bar">Loading</div>
</body>
</html>
`;

type Props = {};

const WebViewAnimation = ({ }: Props): React.ReactElement => {
    return (
        <View style={{
            width: Dimensions.get('window').width * 0.7,
            height: Dimensions.get('window').width * 0.7,
        }}>
            <WebView
                originWhitelist={['*']}
                source={{ html: ANIMATION_HTML }}
                style={{ flex: 1, backgroundColor: 'transparent' }}
                scrollEnabled={false}
                bounces={false}
                overScrollMode="never"
                scalesPageToFit={false}
                javaScriptEnabled={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default WebViewAnimation;
