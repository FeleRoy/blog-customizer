import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

interface ArticleParamsFormProps {
	onSubmit: (FormData: ArticleStateType) => void;
	onReset: () => void;
}

export const ArticleParamsForm = ({
	onSubmit,
	onReset,
}: ArticleParamsFormProps) => {
	const wrapperRef = useRef<HTMLElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const containerClass = isOpen ? styles.container_open : '';
	const [selectedFont, setSelectedFont] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState(
		defaultArticleState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		defaultArticleState.contentWidth
	);
	const selectedReset = () => {
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);
	};

	const handleFormReset = () => {
		selectedReset();
		onReset();
	};

	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onSubmit({
			fontFamilyOption: selectedFont,
			fontSizeOption: selectedFontSize,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidth,
		});
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				className={styles.container + ' ' + containerClass}
				ref={wrapperRef}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<h2 className={styles.form_title}>задайте параметры</h2>
					<Select
						options={fontFamilyOptions}
						selected={selectedFont}
						title={'шрифт'}
						onChange={setSelectedFont}
					/>
					<RadioGroup
						name='radio'
						title='размер шрифта'
						onChange={setSelectedFontSize}
						options={fontSizeOptions}
						selected={selectedFontSize}
					/>
					<Select
						options={fontColors}
						selected={selectedFontColor}
						title='цвет шрифта'
						onChange={setSelectedFontColor}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={selectedBackgroundColor}
						title='цвет фона'
						onChange={setSelectedBackgroundColor}
					/>
					<Select
						options={contentWidthArr}
						selected={selectedContentWidth}
						title='ширина контента'
						onChange={setSelectedContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleFormReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
