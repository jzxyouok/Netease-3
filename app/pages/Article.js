import React,{Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	WebView
} from 'react-native';

export default class Article extends Component{
	render() {
		return (
			<View style={{flex:1}}>
				<WebView 
					source={{uri:"http://mini.eastday.com/mobile/170331205302341.html"}}
					javaScriptEnabled={true}
          			domStorageEnabled={true}
			  	/>
			</View>
		);
	}
}