import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
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
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
interface ArticleParamsFormProps {
	ArticleformState: ArticleStateType;
	onChange: (newValue: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	ArticleformState,
	onChange,
}: ArticleParamsFormProps) => {
	const wrapperRef = useRef<HTMLElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedFont, setSelectedFont] = useState(
		ArticleformState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState(
		ArticleformState.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState(
		ArticleformState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		ArticleformState.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		ArticleformState.contentWidth
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

	useOutsideClickClose({
		isOpen,
		wrapperRef,
		onChange: setIsOpen,
	});

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
