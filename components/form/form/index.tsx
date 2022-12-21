import { useForm, SubmitHandler } from 'react-hook-form'

type FormInput = {
	firstName: string
	lastName: string
	email: string
	age: number
}

const defaultValues: FormInput = {
	firstName: 'Aki',
	lastName: 'Hayakawa',
	email: 'xxx@xxx.exm',
	age: 22,
}

export const Form = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormInput>({
		defaultValues: defaultValues,
		criteriaMode: 'all', // 複数のバリデーションエラーを取得するか
		mode: 'onSubmit', // 最初に発火するタイミング
		reValidateMode: 'onChange', // 2回目以降で発火するタイミング,
	})

	const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data)

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				{...register('firstName', {
					pattern: {
						value: /^[A-Za-z]+$/,
						message: 'アルファベットのみ入力してください。',
					},
					minLength: {
						value: 3,
						message: '3文字以上で入力してください',
					},
					required: {
						value: true,
						message: 'FirstNameは必須項目です',
					},
				})}
			/>
			{errors.firstName?.types?.required && <p>FirstNameは必須項目です</p>}
			{errors.firstName?.types?.pattern && (
				<p>アルファベットのみ入力してください。</p>
			)}
			{errors.firstName?.types?.minLength && (
				<p>10文字以上で入力してください</p>
			)}
			<input
				{...register('lastName', {
					maxLength: {
						value: 50,
						message: '50文字以内で入力してください',
					},
					required: {
						value: true,
						message: 'LastNameは必須項目です',
					},
				})}
			/>
			{errors.lastName && <p>{errors.lastName.message}</p>}
			<input {...register('email', { required: true })} />
			{errors.email && <p>email is required</p>}
			<input type="number" {...register('age', { min: 10 })} />
			{errors.age && <p>10以上で入力してください</p>}
			<input type="submit" />
		</form>
	)
}
