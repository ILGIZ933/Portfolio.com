import React, { useEffect, useState } from 'react'
import css from './LogsContent.module.css'
import { useOutletContext } from 'react-router-dom'

export const LogsContent = () => {
  const [logs, setLogs] = useState([])
  const { playClick } = useOutletContext()

  const latestLog = logs[logs.length - 1]

  useEffect(() => {
    const myVisitDate = new Date()
    const year = myVisitDate.getFullYear()
    const month = String(myVisitDate.getMonth() + 1).padStart(2, '0')
    const day = String(myVisitDate.getDate()).padStart(2, '0')
    const dateStr = `${year}.${month}.${day}`

    fetch('http://localhost:3001/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: dateStr })
    })
      .then(res => res.json())
      .then(data => setLogs(data || []))
      .catch(err => console.error('Ошибка запроса логов:', err))
  }, [])

  return (
    <>
      <span className={css.LogsTextSpan}>data log dump initialized.</span>
      {latestLog && (
        <p className={css.dateLog}>
          <span>LOG ENTRY: PROJECT DEVELOPMENT UPDATE</span>
          <span>date: {latestLog.date}</span>
        </p>
      )}
      <span className={css.location}><span>LOCATION:</span> <span>Research Facility, Planet X-17</span></span>
      <span className={css.projectStatus}><span>PROJECT STATUS:</span> <span>In Development</span></span>
      <div className={css.projectPlans}>
        <div>
          <div className={css.borderDiv}></div>
          <span>project update</span>
          <p>The development team has been working tirelessly on the latest iteration of the project. Significant progress has been made in the areas of neural interface integration, machine learning algorithms, and quantum computing.</p>
        </div>
        <div>
          <div className={css.borderDiv}></div>
          <span>Challenges</span>
          <p>The team has encountered several challenges during the development process, including unexpected system crashes, hardware malfunctions, and unanticipated compatibility issues...</p>
        </div>
        <div>
          <div className={css.borderDiv}></div>
          <span>NEXT STEPS</span>
          <p>The development team has been working tirelessly on the latest iteration of the project. Significant progress has been made in the areas of neural interface integration, machine learning algorithms, and quantum computing.</p>
        </div>
        <div>
          <div className={css.borderDiv}></div>
          <span>CONCLUSION</span>
          <p>Despite the challenges encountered, the team remains optimistic about the potential of the project. The development of advanced neural interfaces and machine learning algorithms ...</p>
        </div>
      </div>
      <div onClick={() => playClick()} className={css.previewProjects}>
        <span>preview visual records</span>
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_3_327)">
            <path d="M4.828 21L4.808 21.02L4.787 21H2.992C2.72881 20.9997 2.4765 20.895 2.29049 20.7088C2.10448 20.5226 2 20.2702 2 20.007V3.993C2.00183 3.73038 2.1069 3.47902 2.29251 3.29322C2.47813 3.10742 2.72938 3.00209 2.992 3H21.008C21.556 3 22 3.445 22 3.993V20.007C21.9982 20.2696 21.8931 20.521 21.7075 20.7068C21.5219 20.8926 21.2706 20.9979 21.008 21H4.828ZM20 15V5H4V19L14 9L20 15ZM20 17.828L14 11.828L6.828 19H20V17.828ZM8 11C7.46957 11 6.96086 10.7893 6.58579 10.4142C6.21071 10.0391 6 9.53043 6 9C6 8.46957 6.21071 7.96086 6.58579 7.58579C6.96086 7.21071 7.46957 7 8 7C8.53043 7 9.03914 7.21071 9.41421 7.58579C9.78929 7.96086 10 8.46957 10 9C10 9.53043 9.78929 10.0391 9.41421 10.4142C9.03914 10.7893 8.53043 11 8 11Z" />
          </g>
          <defs>
            <clipPath id="clip0_3_327">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className={css.otherLogs}>
        <span className={css.otherLogsText}>older logs:</span>
        <div>
          <span>LOG ENTRY: PROJECT DEVELOPMENT UPDATE</span>
          {logs
            .filter(log => log.type === "project_update")
            .map((log, index) => (
              <span key={index}>date {log.date}</span>
            ))}
        </div>
        <div>
          <span>LOG ENTRY: new project started</span>
          {logs
            .filter(log => log.type === "new_project")
            .map((log, index) => (
              <span key={index}>date {log.date}</span>
            ))}
        </div>
        <div>
          <span>LOG ENTRY: release story</span>
          {logs
            .filter(log => log.type === "release_story")
            .map((log, index) => (
              <span key={index}>date {log.date}</span>
            ))}
        </div>
        <div>
          <span>LOG ENTRY: visual updates</span>
          {logs
            .filter(log => log.type === "release_story")
            .map((log, index) => (
              <span key={index}>date {log.date}</span>
            ))}
        </div>
        <div>
          <span>LOG ENTRY: going public</span>
          {logs
            .filter(log => log.type === "release_story")
            .map((log, index) => (
              <span key={index}>date {log.date}</span>
            ))}
        </div>
        <div>
          <span>LOG ENTRY: beta program</span>
          {logs
            .filter(log => log.type === "release_story")
            .map((log, index) => (
              <span key={index}>date {log.date}</span>
            ))}
        </div>
      </div>
    </>
  )
}
