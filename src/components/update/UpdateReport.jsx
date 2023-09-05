import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../modal/Modal';
// import 

export const report = () => {
    const [formData, setFormData] = useState({
        date: "",
        project: "",
        task: "",
        status: "",
        link: "",
        duration: "",

    });
    const [isOnline, setIsOnline] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ModalDisplayDuration, setModalDisplayDuration] = useState(5000);
    useEffect(() => {
        if (isModalOpen) {
            const modalCloseTimer = setTimeout(() => {
                setIsModalOpen(false);
            }, ModalDisplayDuration);
            return () => clearTimeout(modalCloseTimer);
      }
    }, [isModalOpen]);
    const checkNetworkStatus = () => {
        setIsOnline(Navigator.onLine);
  };
  useEffect(() => {
    checkNetworkStatus();
    window.addEventListener("online", checkNetworkStatus);
    window.addEventListener("offline", checkNetworkStatus); 
    return () => {
        window.removeEventListener("online", checkNetworkStatus); 
        window.removeEventListener("offline", checkNetworkStatus);
        ;
    },[]);
    const [reportEntries, setReportEntries] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((preData) => ({
            ...preData,
            [name]: value,
        }));
    };
    const navigate = useNavigate()
    const handleLogout = () => {
        sessionStorage.removeItem('access_token');
        navigate()
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!isOnline) {
            setIsModalOpen(true);
            setLoading(false);
            return;
        }
        const accessToken = sessionStorage.getItem('access_token');
        const requestData = {
            date: formData.get('date'),
            project: formData.get('project'),
            task: formData.get('task'),
            status: formData.get('status'),
            link: formData.get('link'),
            duration: formData.get('duration'),
        };
        try {
            const response = await fetch('https://timesheet-api-main.onrender.com/record/report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(requestData),
            });
            
            if (response.statusCode === 200) {
                setReportEntries([...reportEntries, requestData]);
                console.log('Successfully');
            }  else {
                alert('Error: ' + response.status);
            }
        } catch (e) {
            console.error('Error: ' + e.message); 
        } finally {
            setLoading(false);
        }  
        setFormData ({
            date: "",
            project: "",
            task: "",
            status: "",
            link: "",
            duration: "",
        });
    }
    const handleEdit = (reportData) => {
        setEditMode(true);
        setFormData(reportData);
    };
    const handleCancelEdit = () => {
        setEditMode(false);
        setFormData({
            date: "",
            project: "",
            task: "",
            status: "",
            link: "",
            duration: "",
        });
    };
    const handleSaveChanges = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const accessToken = sessionStorage.get.getItem("access_token");
            const requestData = {
                date: formData.get("date"),
                project: formData.get("project"),
                task: formData.get("task"),
                status: formData.get("status"),
                link: formData.get("link"),
                duration: formData.get("duration"),
            };
            const response = await fetch('https://timesheet-api-main.onrender.com/record/report', {
                
            }
        }
