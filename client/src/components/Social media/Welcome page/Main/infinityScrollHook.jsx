import { useEffect } from "react";

export function useInfiniteScroll(mainRef, loadMore) {
    useEffect(() => {
        if (!mainRef?.current) return;

        const handleScroll = () => {
            const mainElement = mainRef.current;
            if (!mainElement) return;

            const scrollHeight = mainElement.scrollHeight;
            const currentHeight = mainElement.scrollTop + mainElement.clientHeight;

            if (currentHeight + 5 >= scrollHeight) {
                loadMore();
            }
        };

        mainRef.current.addEventListener("scroll", handleScroll);

        return () => {
            if (mainRef.current) {
                mainRef.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, [mainRef, loadMore]);
}