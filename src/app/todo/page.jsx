'use client'

import { addFunc, byId, delFunc, editFunc, getData } from '@/reducers/todoSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Box, Button, Dialog, DialogTitle, TextField } from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import InfoOutlineIcon from '@mui/icons-material/InfoOutline'
import { useTheme } from '@/context/theme'
import BrightnessLowIcon from '@mui/icons-material/BrightnessLow'
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh'

export default function Todo() {
	const { data, info } = useSelector(state => state.todos)
	console.log('INFO:', info)

	const [addModal, setAddModal] = useState(false)
	const [name, setName] = useState('')

	const [editModal, setEditMdoal] = useState(false)
	const [editName, setEditName] = useState('')
	const [idx, setIdx] = useState(null)

	const [infoModal, setInfoModal] = useState(false)
	const [infoName, setInfoName] = useState('')
	const [ID, setID] = useState(null)

	const [search, setSearch] = useState('')

	const handleClose = () => {
		onClose(selectedValue)
	}

	function handleAdd() {
		const newTodo = {
			name,
		}
		dispatch(addFunc(newTodo))
		setName('')
		setAddModal(false)
	}

	function handleEdit(todo) {
		setEditName(todo.name)
		setIdx(todo.id)
		setEditMdoal(true)
	}

	function edit() {
		const edited = {
			id: idx,
			name: editName,
		}
		dispatch(editFunc(edited))
		setEditMdoal(false)
		setEditName('')
		setIdx(null)
	}

	async function handleInfo(todo) {
		const result = await dispatch(byId(todo.id))

		if (result.payload) {
			setInfoName(result.payload.name)
			setID(result.payload.id)
			setInfoModal(true)
		}
	}

	const dispatch = useDispatch()

	const { theme, toggleTheme } = useTheme()

	useEffect(() => {
		dispatch(getData())
	}, [])

	return (
		<div
			className={` h-[100vh] transition-colors duration-500 ease-in-out ${
				theme === 'dark'
					? 'bg-gray-700 text-gray-100'
					: 'bg-gray-50 text-gray-900'
			}`}
		>
			<Button
				sx={{ marginLeft:'92%' , marginTop:'20px' }}
				// variant='contained'
				onClick={toggleTheme}
				className='bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 text-white'
			>
				{theme === 'dark' ? <BrightnessLowIcon /> : <BrightnessHighIcon />}
			</Button>

			{/* //////////////////////////////////////////// */}

			<div className='max-w-[1200px] m-auto flex justify-between items-center mt-10'>
				<h1 className='text-[40px]'>Todo</h1>
				<TextField
					id='standard-basic'
					label='Search...'
					variant='standard'
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
				<Button
					variant='outlined'
					color='info'
					onClick={() => setAddModal(true)}
				>
					Add New+
				</Button>
			</div>
			<TableContainer
				component={Paper}
				sx={{ maxWidth: '1200px', margin: ' 60px auto' }}
			>
				<Table
					sx={{ minWidth: 650, maxWidth: '1200px', margin: 'auto' }}
					aria-label='simple table'
				>
					<TableHead
						sx={{
							bgcolor: theme === 'dark' ? 'gray' : 'indigo.600',
						}}
					>
						<TableRow>
							<TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
							<TableCell align='right' sx={{ fontWeight: 'bold' }}>
								Name
							</TableCell>
							<TableCell
								align='right'
								sx={{ paddingRight: '50px', fontWeight: 'bold' }}
							>
								Actions
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data
							.filter(el => JSON.stringify(el).includes(search))
							.map(el => (
								<TableRow
									sx={{
										cursor: 'pointer',
										transition: 'background-color 300ms, color 300ms',

										bgcolor: theme === 'dark' ? 'grey.800' : 'white',
										color: theme === 'dark' ? 'white' : 'black',
									}}
									key={el.id}
								>
									<TableCell
										sx={{ color: theme == 'dark' ? 'white' : 'black' }}
										component='th'
										scope='row'
									>
										{el.id}
									</TableCell>
									<TableCell
										sx={{ color: theme == 'dark' ? 'white' : 'black' }}
										align='right'
									>
										{el.name}
									</TableCell>
									<TableCell align='right'>
										<div>
											<Button
												color='error'
												onClick={() => dispatch(delFunc(el.id))}
											>
												<DeleteOutlineIcon />
											</Button>
											<Button color='info' onClick={() => handleEdit(el)}>
												<BorderColorIcon />
											</Button>
											<Button color='secondary' onClick={() => handleInfo(el)}>
												<InfoOutlineIcon />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>

			{/* //! Add Modal */}
			<Dialog onClose={handleClose} open={addModal}>
				<DialogTitle>Add Todo</DialogTitle>
				<Box
					sx={{
						padding: '30px 20px',
						display: 'flex',
						flexDirection: 'column',
						gap: '40px',
					}}
				>
					<TextField
						value={name}
						onChange={e => setName(e.target.value)}
						id='standard-basic'
						label='Put Name'
						variant='standard'
					/>
					<div className='flex justify-end gap-5'>
						<Button color='error' onClick={() => setAddModal(false)}>
							Cancel
						</Button>
						<Button variant='outlined' onClick={handleAdd}>
							Add
						</Button>
					</div>
				</Box>
			</Dialog>

			{/* //! Edit Modal */}
			<Dialog onClose={handleClose} open={editModal}>
				<DialogTitle>Edit Todo</DialogTitle>
				<Box
					sx={{
						padding: '30px 20px',
						display: 'flex',
						flexDirection: 'column',
						gap: '40px',
					}}
				>
					<TextField
						value={editName}
						onChange={e => setEditName(e.target.value)}
						id='standard-basic'
						label='Put Name'
						variant='standard'
					/>
					<div className='flex justify-end gap-5'>
						<Button color='error' onClick={() => setEditMdoal(false)}>
							Cancel
						</Button>
						<Button variant='outlined' onClick={edit}>
							Edit
						</Button>
					</div>
				</Box>
			</Dialog>

			{/* //! ById Modal */}
			<Dialog onClose={handleClose} open={infoModal}>
				<DialogTitle>Info</DialogTitle>
				<Box
					sx={{
						padding: '30px 20px',
						display: 'flex',
						flexDirection: 'column',
						gap: '40px',
					}}
				>
					<TextField
						value={ID}
						id='standard-basic'
						label='ID'
						type='number'
						variant='standard'
					/>
					<TextField
						value={infoName}
						id='standard-basic'
						label='Name'
						variant='standard'
					/>
					<div className='flex justify-end gap-5'>
						<Button color='error' onClick={() => setInfoModal(false)}>
							Cancel
						</Button>
					</div>
				</Box>
			</Dialog>
		</div>
	)
}
