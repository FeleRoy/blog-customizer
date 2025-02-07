import { CSSProperties, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';
import styles from './index.module.scss';

export const App = () => {
	const [ArticleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const handleFormSubmit = (data: ArticleStateType) => {
		setArticleState(data);
	};
	const handleFormReset = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': ArticleState.fontFamilyOption.value,
					'--font-size': ArticleState.fontSizeOption.value,
					'--font-color': ArticleState.fontColor.value,
					'--container-width': ArticleState.contentWidth.value,
					'--bg-color': ArticleState.backgroundColor.value,
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
