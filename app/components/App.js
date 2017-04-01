import React,{Component} from "react";
import{
	Navigator
} from "react-native";
import Main from "./Main.js";

export default class App extends Component{
	_renderScene(router,navigator){
		let MyComponent = router.component;
		return <MyComponent navigator={navigator} />
	}
	render(){
		return (
			<Navigator 
				initialRoute={{component : Main}}
				renderScene={this._renderScene}
			/>
		)
	}
}