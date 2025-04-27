import React, { useEffect, useState } from 'react';
import { MdAdd, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../../store/app';
import { ADD_NEW_RECORD_REQUESTING, ADD_NEW_RECORD_SAGA_REQUESTING, GET_PARAMETER_REQUESTING, GET_PARAMETER_SAGA_REQUESTING, GET_TEST_REQUESTING, GET_TEST_SAGA_REQUESTING, GET_UNIT_REQUESTING, GET_UNIT_SAGA_REQUESTING } from '../../constants/actionTypes';
import { getParameters, getTests, getUnits } from '../../store/appSelector';


export default function AddNewRecord({ setActiveTab }) {
    const dispatch = useDispatch();
    const tests = useSelector(getTests);
    const parameters = useSelector(getParameters);
    const units = useSelector(getUnits);

    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [test, setTest] = useState('');
    // const [date, setDate] = useState(new Date());
    const [parameterRows, setParameterRows] = useState([
        { parameter: '', value: '', unit: '', reference: '' }
    ]);

    useEffect(() => {
        dispatch(appActions[GET_TEST_REQUESTING]());
        dispatch({ type: GET_TEST_SAGA_REQUESTING });
        dispatch(appActions[GET_PARAMETER_REQUESTING]());
        dispatch({ type: GET_PARAMETER_SAGA_REQUESTING });
        dispatch(appActions[GET_UNIT_REQUESTING]());
        dispatch({ type: GET_UNIT_SAGA_REQUESTING });
    }, []);

    const addParameterRow = () => {
        setParameterRows([...parameterRows, { parameter: '', value: '', unit: '', reference: '' }]);
    };

    const deleteParameterRow = (indexToDelete) => {
        const updatedRows = parameterRows.filter((_, index) => index !== indexToDelete);
        setParameterRows(updatedRows);
    };

    const handleSave = () => {
        const payload = {
            firstName,
            middleName,
            lastName,
            age,
            sex,
            test,
            // date,
            parameters: parameterRows
        };
        console.log("Payload to submit:", payload);
        dispatch(appActions[ADD_NEW_RECORD_REQUESTING]());
        dispatch({ type: ADD_NEW_RECORD_SAGA_REQUESTING, payload: payload });
        setActiveTab(1)
    };

    const handleParameterChange = (index, field, value) => {
        const updatedRows = [...parameterRows];
        updatedRows[index][field] = value;
        setParameterRows(updatedRows);
    };

    const isSaveDisabled =
        !firstName.trim() ||
        !lastName.trim() ||
        !age ||
        !sex ||
        !test ||
        parameterRows.some(row =>
            !row.parameter.trim() || !row.value || !row.unit.trim() || !row.reference.trim()
        );

    return (
        <>
            <div className='w-full p-2 rounded-full flex items-center justify-between'>
                <p className="font-bold text-third">ADD NEW RECORD</p>
                <button
                    disabled={isSaveDisabled}
                    className="py-2 px-5 rounded-full bg-[#4d6139] hover:scale-90 transform-fill transition cursor-pointer text-white disabled:opacity-50"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
            <div className='flex flex-col gap-2 overflow-scroll'>
                {/* row 1 */}
                <div className='flex items-center justify-between w-full gap-2'>
                    <input
                        type="text"
                        placeholder='First Name'
                        className='p-2 bg-secondary outline-0 rounded-xl flex-1'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder='Middle Name'
                        className='p-2 bg-secondary outline-0 rounded-xl flex-1'
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder='Last Name'
                        className='p-2 bg-secondary outline-0 rounded-xl flex-1'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder='Age'
                        className='p-2 bg-secondary outline-0 rounded-xl'
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <select
                        className='p-2 bg-secondary outline-0 rounded-xl'
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                    >
                        <option value="" disabled>Select Sex</option>
                        <option value="M">M</option>
                        <option value="F">F</option>
                    </select>
                </div>

                {/* row 2 */}
                <div className='flex items-center justify-between w-full gap-2'>
                    <select
                        className='p-2 bg-secondary outline-0 rounded-xl flex-1'
                        value={test}
                        onChange={(e) => setTest(e.target.value)}
                    >
                        <option value="" disabled>Select Test</option>
                        {tests.map((test) => (
                            <option key={test._id} value={test.name}>{test.name}</option>
                        ))}
                    </select>
                    {/* date picker */}
                    {/* <div className='p-2 bg-secondary outline-0 rounded-xl'>
                        <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                            className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
                            calendarClassName="custom-calendar"
                            dayClassName={() => "text-gray-800"} 
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select Date"
                        />
                    </div> */}
                </div>

                {/* row 3 - dynamic parameter rows */}
                {parameterRows.map((row, index) => (
                    <div key={index} className='flex items-center justify-between w-full gap-2'>
                        <select
                            className='p-2 bg-secondary outline-0 rounded-xl flex-1'
                            value={row.parameter}
                            onChange={(e) => handleParameterChange(index, 'parameter', e.target.value)}
                        >
                            <option value="" disabled>Select Parameter</option>
                            {parameters.map((param) => (
                                <option key={param._id} value={param.name}>{param.name}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            placeholder='Value'
                            className='p-2 bg-secondary outline-0 rounded-xl flex-1'
                            value={row.value}
                            onChange={(e) => handleParameterChange(index, 'value', e.target.value)}
                        />
                        <select
                            className='p-2 bg-secondary outline-0 rounded-xl flex-1'
                            value={row.unit}
                            onChange={(e) => handleParameterChange(index, 'unit', e.target.value)}
                        >
                            <option value="" disabled>Select Unit</option>
                            {units.map((unit) => (
                                <option key={unit._id} value={unit.name}>{unit.name}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder='Reference'
                            className='p-2 bg-secondary outline-0 rounded-xl flex-1'
                            value={row.reference}
                            onChange={(e) => handleParameterChange(index, 'reference', e.target.value)}
                        />

                        <div className="flex gap-1">
                            {index === parameterRows.length - 1 && (
                                <button
                                    className="p-2 rounded-full bg-[#4d6139] hover:scale-90 transform-fill transition cursor-pointer"
                                    onClick={addParameterRow}
                                >
                                    <MdAdd color="white" />
                                </button>
                            )}
                            {parameterRows.length > 1 && (
                                <button
                                    className="p-2 rounded-full bg-red-700 hover:scale-90 transform-fill transition cursor-pointer"
                                    onClick={() => deleteParameterRow(index)}
                                >
                                    <MdDelete color="white" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}