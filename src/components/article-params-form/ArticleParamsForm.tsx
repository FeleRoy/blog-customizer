import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
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
	onSubmit: (FormData: ArticleStateType) => void;
	onReset: () => void;
}

export const ArticleParamsForm = ({
	onSubmit,
	onReset,
}: ArticleParamsFormProps) => {
	const wrapperRef = useRef<HTMLElement>(null);
	const [isOpen, setIsOpen] = useState(false);
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
				className={clsx(
					styles.container,
					isOpen ? styles.container_open : null
				)}
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
