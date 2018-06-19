const React = require('react');
import {ReactTinyDOM} from './renderer'

const View = "View";
const Text = "Text";

class App extends React.Component {
    render(){
        return (
            <View>
                <Text>Hello World!</Text>
            </View>
        )
    }
}

class Container {
    appendChild(){

    }
}

ReactTinyDOM.render(<App/>, new Container());
