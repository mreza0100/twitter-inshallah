import { disableFixPageScroll } from "./constants";

var firstPosition: number;

function setCurrentScroll() {
	const CurrentScrollPosition = document.getElementsByTagName("html")[0].scrollTop;
	firstPosition = CurrentScrollPosition;
}

function fallbackToFirstPlace() {
	setTimeout(() => {
		window.scrollTo({ top: firstPosition, behavior: "smooth" });
	}, 2000);
}

/**
 *
 * @function fixScrollPage
 * isItInTheCache is "true": it means that data is begin to download from server
 * isItInTheCache is "false": it means that data is downloaded and ready to go for are render tree
 * its where im initialize a defere for when ever are render was don and ready to scroll the page
 *
 */

export default function fixScrollPage(isItInTheCache: boolean) {
	if (disableFixPageScroll) return;

	if (isItInTheCache) setCurrentScroll();
	fallbackToFirstPlace();
}
