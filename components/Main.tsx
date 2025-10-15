import AnimatedContent from "./Animation/AnimatedContent";
import Card from "./Card";

const Main = () => {
    return (<>
        <div className="max-w-screen-xl py-6 pb-20 px-4 mx-auto">
            <div className="grid gap-7 md:grid-cols-3">
                <AnimatedContent>
                    <Card></Card>
                </AnimatedContent>
                <AnimatedContent>
                    <Card></Card>
                </AnimatedContent>
                <AnimatedContent>
                    <Card></Card>
                </AnimatedContent>
                <AnimatedContent>
                    <Card></Card>
                </AnimatedContent>
                <AnimatedContent>
                    <Card></Card>
                </AnimatedContent>
                <AnimatedContent>
                    <Card></Card>
                </AnimatedContent>
            </div>
        </div>
    </>)
}

export default Main;