import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [formData, setFormData] =
		useState<ArticleStateType>(defaultArticleState);
	const handleFormSubmit = (data: ArticleStateType) => {
		setFormData(data);
		console.log(data);
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

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
