import { useEffect, useState } from "react";
import store from "./store";

export default function (mapStateToProps, mapDispatchToProps) {
    return (UIcompoment) => {
        return (props) => {
            const [fake, setFake] = useState({});
            useEffect(() => {
                const unsubscribe = store.subscribe(() => {
                    //????
                    setFake({})
                });
                return () => {
                    unsubscribe();
                };
            });
            return <UIcompoment {...props} {...mapStateToProps(store.getState())} {...mapDispatchToProps(store.dispatch)}/>;
        };
    };
}
