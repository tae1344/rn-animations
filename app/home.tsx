import {StarrySky} from "@/components/StarrySky";
import TarotCardAnimation from "@/components/TaroCard";
import TinderSwipe from "@/components/TinderSwipe";
import {View} from "react-native";

export default function Home() {
    return (
        <View style={{flex: 1}}>
            {/* <StarrySky/> */}
            {/* <TarotCardAnimation/> */}
            <TinderSwipe/>
        </View>
    );
}
