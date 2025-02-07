import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import clsx from 'clsx';
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
	articleformState: ArticleStateType;
	onChange: (newValue: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	articleformState,
	onChange,
}: ArticleParamsFormProps) => {
	const wrapperRef = useRef<HTMLElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedFont, setSelectedFont] = useState(
		articleformState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState(
		articleformState.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState(
		articleformState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		articleformState.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		articleformState.contentWidth
	);

	const handleFormReset = () => {
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);
		onChange({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontSizeOption: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		});
	};

	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onChange({
			fontFamilyOption: selectedFont,
			fontSizeOption: selectedFontSize,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidth,
		});
	};

	useEffect(() => {
		if (!isOpen) return;
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
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={wrapperRef}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text
						size={31}
						weight={800}
						uppercase
						align='left'
						family='open-sans'>
						задайте параметры
					</Text>
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
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
