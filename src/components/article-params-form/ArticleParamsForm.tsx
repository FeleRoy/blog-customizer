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
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
interface ArticleParamsFormProps {
	onSubmit: (FormData: ArticleStateType) => void;
	onReset: () => void;
	formState: ArticleStateType;
}

export const ArticleParamsForm = ({
	onSubmit,
	onReset,
	formState,
}: ArticleParamsFormProps) => {
	const wrapperRef = useRef<HTMLElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedFont, setSelectedFont] = useState(formState.fontFamilyOption);
	const [selectedFontSize, setSelectedFontSize] = useState(
		formState.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState(
		formState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		formState.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		formState.contentWidth
	);
	const selectedReset = () => {
		setSelectedFont(formState.fontFamilyOption);
		setSelectedFontSize(formState.fontSizeOption);
		setSelectedFontColor(formState.fontColor);
		setSelectedBackgroundColor(formState.backgroundColor);
		setSelectedContentWidth(formState.contentWidth);
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
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
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
