import React, { useEffect, useRef, useState } from "react";
import $, { CSSObject } from "styled-components";
import { jssToStr } from "../helpers";
import { useKeyDown } from "../hooks";

type SetStylesT = (open: boolean) => CSSObject;
interface DropDownMenuPropsT {
	children: React.ReactNode;
	title: React.ReactNode;
	parentStyles?: SetStylesT;
	ulStyles?: SetStylesT;
}
export default function DropDownMenu({ children, title, parentStyles, ulStyles }: DropDownMenuPropsT) {
	const [isOpen, setOpen] = useState(false);
	const dropDownRef = useRef<HTMLDivElement>(null);

	const toggleDropDown = () => {
		setOpen(prev => !prev);
	};
	const closeDropDown = () => {
		setOpen(false);
	};

	useKeyDown("keydown", "Escape", closeDropDown);
	const closeOnRangeClick = ({ target }: MouseEvent) => {
		if (dropDownRef.current) {
			if (!dropDownRef.current.contains(target as Node)) closeDropDown();
		}
	};
	useEffect(() => {
		window.addEventListener("click", closeOnRangeClick);
		return () => window.removeEventListener("click", closeOnRangeClick);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<DropDown parentStyles={parentStyles} open={isOpen} ref={dropDownRef}>
			<span onClick={toggleDropDown}>
				{title}
				<i className="icon-drop-arrow" />
			</span>
			<Ul open={isOpen} ulStyles={ulStyles}>
				{isOpen ? children : null}
			</Ul>
		</DropDown>
	);
}

interface UlPropsT {
	open: boolean;
	ulStyles?: SetStylesT;
}
const Ul = $.ul<UlPropsT>(({ theme: { flex }, open, ulStyles }) => {
	const extraStyles = ulStyles ? jssToStr(ulStyles(open)) : "";

	return `
		${flex(["justifyContent"])}
		justify-content: flex-start;
		flex-direction: column;
		position: absolute;
		background-color: #FFF;
		overflow: hidden;
		padding: 0 25px;
		list-style: none;
		top: 20px;
		left: 0;
		transition: all 0.3s;
		${extraStyles}
		li {
			button {
				color: #000;
			}
		}
		`;
});

interface DropDownPropsT {
	open: boolean;
	parentStyles?: SetStylesT;
}
const DropDown = $.div<DropDownPropsT>(({ theme: { flex }, open, parentStyles }) => {
	const extraStyles = parentStyles ? jssToStr(parentStyles(open)) : "";
	return `
		${flex()}
		min-height: 30px;
		z-index: 9999999;
		border-radius: 4px;
		font-size: 12px;
		position: relative;
		span {
			${flex()}
			width: 1px;
			height: 100%;
			cursor: pointer;
			text-align: center;
			line-height: 2.4;
			user-select: none;
			> i {
				${flex()}
				transition: all 0.3s;
				font-size: 8px;
				width: 20px;
				transform: ${open ? "rotate(180deg)" : "unset"};
			},
		},
		${extraStyles}
	`;
});
