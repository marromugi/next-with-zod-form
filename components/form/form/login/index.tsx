import { useForm, SubmitHandler } from 'react-hook-form'

type LoginFormInput = {
	email: string
	password: string
}

const defaultValues: LoginFormInput = {
	email: '',
	password: '',
}

export const LoginForm = () => {
	// isValid: フォームの値がバリデーションを突破している場合 true
	// dirtyFields: 変更されたフォームの値
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, dirtyFields, isValid },
	} = useForm<LoginFormInput>({
		defaultValues: defaultValues,
		criteriaMode: 'all', // 複数のバリデーションエラーを取得するか
		mode: 'onChange', // 最初に発火するタイミング
		reValidateMode: 'onChange', // 2回目以降で発火するタイミング,
	})

	const onSubmit: SubmitHandler<LoginFormInput> = (data) => console.log(data)
	/**
	 * パスワードとメールアドレスどちらもデフォルト値でない場合に true をとる
	 */
	const isMyDirty = dirtyFields.email && dirtyFields.password

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register('email', {
						pattern: {
							value: /^[A-Za-z]+$/,
							message: 'アルファベットのみ入力してください。',
						},
						required: {
							value: true,
							message: 'この項目は必須項目です',
						},
						minLength: {
							value: 6,
							message: '６文字以上入力してください',
						},
					})}
				/>
				{errors.email?.types?.required && <p>{errors.email.types.required}</p>}
				{errors.email?.types?.pattern && <p>{errors.email.types.pattern}</p>}
				{errors.email?.types?.minLength && (
					<p>{errors.email.types.minLength}</p>
				)}
				<input
					{...register('password', {
						required: {
							value: true,
							message: 'この項目は必須項目です',
						},
					})}
				/>
				{errors.email?.types?.required && <p>{errors.email.types.required}</p>}
				<button type="submit" disabled={!isMyDirty || !isValid}>
					ログイン
				</button>
			</form>
			<h2>Watch Result</h2>
			<div>Email: {watch('email')}</div>
			<div>Password: {watch('password')}</div>
		</>
	)
}
