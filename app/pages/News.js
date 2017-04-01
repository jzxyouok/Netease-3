import React,{Component} from "react";
import {
	StyleSheet,
	View,
	Text,
	Image,
	ScrollView,
	ListView,
	RefreshControl,
	TouchableOpacity
} from "react-native";
import ViewPager from 'react-native-viewpager';
import Dimensions from "Dimensions";
import Article from './Article.js';

let {width,height} = Dimensions.get("window");
const IMGS = [
	require("../images/slide1.jpg"),
	require("../images/slide2.jpg"),
	require("../images/slide3.jpg"),
	require("../images/slide4.jpg"),
	require("../images/slide5.jpg")
];
const url = "http://v.juhe.cn/toutiao/index?type=top&key=2d54fa565a9646d5e780080b7e1d9b73";
export default class News extends Component{
	constructor(props) {
		super(props);
		let ds = new ViewPager.DataSource({
			pageHasChanged : (p1,p2) => p1 !== p2
		});
		this.state = {
			data : ds.cloneWithPages(IMGS),//轮播图片
			dataSource : new ListView.DataSource({
				rowHasChanged : (r1,r2) => r1 !== r2
			}),//新闻的数据
			isRefreshing : false
		}
	}
	_renderPage(img){
		return <Image source={img} style={styles.slide} />
	}

	_renderRow(row){
		// class Art extends Component{
		// 	constructor(props){
		// 		super(props);
		// 	}
		// 	render(){
		// 		return(
		// 			<View style={{flex:1}}>
		// 				<WebView 
		// 					source={{uri:row.url}}
		// 					javaScriptEnabled={true}
		//           			domStorageEnabled={true}
		// 			  	/>
		// 			</View>
		// 		)
		// 	}
		// }
		return(
			<TouchableOpacity onPress={ () => this.props.navigator.push({component:Article}) }>
				<View style={styles.list}>
					<Image source={{uri : row.thumbnail_pic_s}} style={styles.thumb}/>
					<View style={{flex : 1}}>
						<Text>{row.title}</Text>
						<View style={styles.meta}>
							<Text>{row.author_name}</Text>
							<Text>{row.date}</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>	
		)
	}
	getNews(){
		fetch(url)
			.then((response) => response.json())
			.then((json) => {
				// console.log(json);
				this.setState({
					dataSource : this.state.dataSource.cloneWithRows(json.result.data)
				})
			})
			.catch((error) => {
				console.error(error);
			})
	}
	componentDidMount() {
		this.getNews()
	}
	refresh(){
		this.setState({isRefreshing : true});
		this.getNews();
		this.setState({isRefreshing : false});
	}
	render(){
		let listViewContent;
		if(this.state.dataSource.getRowCount() === 0){
			// 没有数据
			listViewContent = <Text>没有任何新闻</Text>
		} else{
			// 有数据
			listViewContent = <ListView dataSource={this.state.dataSource} renderRow={this._renderRow.bind(this)}/>
		}
		return(
			<View style={styles.container}>
				{/*logo部分*/}
				<View style={styles.logo}>
					<Image source={require("../images/logo.png")} style={styles.logoImg}/>
				</View>
				{/*分类导航部分*/}
				<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{height:40}}>
					<Text style={[styles.cat,styles.on]}>头条</Text>
					<Text style={styles.cat}>精选</Text>
					<Text style={styles.cat}>娱乐</Text>
					<Text style={styles.cat}>体育</Text>
					<Text style={styles.cat}>财经</Text>
					<Text style={styles.cat}>本地</Text>
					<Text style={styles.cat}>IT</Text>
					<Text style={styles.cat}>科技</Text>
					<Text style={styles.cat}>女人</Text>
					<Text style={styles.cat}>购物</Text>
					<Text style={styles.cat}>健康</Text>
					<Text style={styles.cat}>教育</Text>
					<Text style={styles.cat}>历史</Text>
					<Text style={styles.cat}>军事</Text>
					<Text style={styles.cat}>国际</Text>
					<Text style={styles.cat}>招聘</Text>
					<Text style={styles.cat}>段子</Text>
					<Text style={styles.cat}>图片</Text>
					<Text style={styles.cat}>视频</Text>
				</ScrollView>
				{/*滚动部分，包括轮播图和新闻列表*/}
				<ScrollView refreshControl={
					<RefreshControl refreshing={this.state.isRefreshing} enable={true} onRefresh={this.refresh.bind(this)}/>
				}>
					{/*图片轮播*/}
					<View style={styles.carousel}>
						<ViewPager
							dataSource={this.state.data}
							renderPage={this._renderPage}
							autoPlay={true}
							isLoop={true}
						/>
					</View>
					{/*新闻列表*/}
					<View>
						{listViewContent}
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container : {
		flex : 1
	},
	logo : {
		height : 40,
		backgroundColor : "#c00",
		justifyContent : 'center',
		alignItems : 'center'
	},
	logoImg : {
		width : 56,
		height : 32
	},
	cat : {
		marginHorizontal : 10,
		alignSelf :'center'
	},
	on : {
		color : "#c00",
		fontWeight : 'bold'
	},
	carousel : {
		height : 130
	},
	slide : {
		height : 130,
		width : width,
		resizeMode : 'stretch'
	},
	list : {
		margin : 10,
		flexDirection:'row',
		borderBottomWidth : 1,
		borderColor : "#ddd",
		paddingBottom : 10
	},
	thumb : {
		width : 60,
		height : 60,
		marginRight : 10
	},
	meta : {
		flexDirection : 'row',
		justifyContent : 'space-between'
	}
});