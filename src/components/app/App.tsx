import clsx from 'clsx';
import { CSSProperties, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';
import styles from './index.module.scss';

export const App = () => {
	const [formData, setFormData] =
		useState<ArticleStateType>(defaultArticleState);
	const handleFormSubmit = (data: ArticleStateType) => {
		setFormData(data);
	};
	const handleFormReset = () => {
		setFormData(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': formData.fontFamilyOption.value,
					'--font-size': formData.fontSizeOption.value,
					'--font-color': formData.fontColor.value,
					'--container-width': formData.contentWidth.value,
					'--bg-color': formData.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onSubmit={handleFormSubmit}
				onReset={handleFormReset}
			/>
			<Article />
		</main>
	);
};
