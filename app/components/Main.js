import React,{Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image
} from "react-native";
import TabNavigator from "react-native-tab-navigator";
import News from "../pages/News.js";
import Live from "../pages/Live.js";
import Topic from "../pages/Topic.js";
import User from "../pages/User.js";
// 导入图片
const IMGS = [
	require("../images/news.png"),
	require("../images/live.png"),
	require("../images/topic.png"),
	require("../images/user.png")
];
const IMGS_ON = [
	require("../images/news_on.png"),
	require("../images/live_on.png"),
	require("../images/topic_on.png"),
	require("../images/user_on.png")
];

export default class Main extends Component{
	constructor(props) {
		super(props);
		this.state = {
			selectedTab : "news"
		};
	}
	render(){
		return (
			<TabNavigator>
				<TabNavigator.Item
					renderIcon={() => <Image source={IMGS[0]} style={styles.img} />}
					renderSelectedIcon={() => <Image source={IMGS_ON[0]} style={styles.img} />}
					title="新闻"
					selected={this.state.selectedTab==="news"}
					onPress={() => this.setState({selectedTab : "news"})}>
					<News navigator={this.props.navigator}/>
				</TabNavigator.Item>
				<TabNavigator.Item
					renderIcon={() => <Image source={IMGS[1]} style={styles.img}/>}
					renderSelectedIcon={() => <Image source={IMGS_ON[1]} style={styles.img}/>}
					title="live"
					selected={this.state.selectedTab==="live"}
					onPress={() => this.setState({selectedTab : "live"})}>
					<Live />
				</TabNavigator.Item>
				<TabNavigator.Item
					renderIcon={() => <Image source={IMGS[2]} style={styles.img}/>}
					renderSelectedIcon={() => <Image source={IMGS_ON[2]} style={styles.img}/>}
					title="topic"
					selected={this.state.selectedTab==="topic"}
					onPress={() => this.setState({selectedTab : "topic"})}>
					<Topic />
				</TabNavigator.Item>
				<TabNavigator.Item
					renderIcon={() => <Image source={IMGS[3]} style={styles.img}/>}
					renderSelectedIcon={() => <Image source={IMGS_ON[3]} style={styles.img}/>}
					title="user"
					selected={this.state.selectedTab==="user"}
					onPress={() => this.setState({selectedTab : "user"})}>
					<User />
				</TabNavigator.Item>
			</TabNavigator>
		)
	}
}
const styles = StyleSheet.create({
	img : {
		width : 25,
		height : 25
	}
})