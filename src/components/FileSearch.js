import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons'
import useKeyPress from '../hooks/useKeyPress'
import ProTypes from 'prop-types'

const FileSearch = ({ title, onFileSearch }) => {
  const [inputActivte, setInputActive] = useState(false)
  const [value, setValue] = useState('')
  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)
  let node = useRef(null);
  const closeSearch = () => {
    setInputActive(false);
    setValue('')
  }

  useEffect(() => {
    if (enterPressed && inputActivte) {
      onFileSearch(value)
    }
    if (escPressed && inputActivte) {
      closeSearch()
    }
    // const handleInputEvent = (event) => {
    //   console.log(event,123)
    //   const { keyCode } = event;
    //   if (keyCode === 13 && inputActivte) {
    //     onFileSearch(value)
    //   } else if (keyCode === 27 && inputActivte) {
    //     closeSearch(event)
    //   }
    // }
    // document.addEventListener('keyup', handleInputEvent)
    // return () => {
    //   document.removeEventListener('keyup', handleInputEvent)
    // }
  })

  useEffect(() => {
    if (inputActivte) {
      node.current.focus();
    }
  })

  return (
    <div className="alert alert-primary">
      { !inputActivte && 
        <div className="d-flex justify-content-between align-items-center">
          <span>{title}</span>
          <button
            type="button"
            className="icon-button"
            onClick={() => { setInputActive(true) }}
          >
          <FontAwesomeIcon
            title="搜索"
            size="lg"
            icon={faSearch} />
          </button>
        </div>
      }
      { inputActivte && 
        <div className="d-flex justify-content-between align-items-center">
        <input className="form-control"
          value={value}
          ref={node}
          onChange={(e)=>{setValue(e.target.value)}}
          >
        </input>
        <button
          type="button"
          className="icon-button"
          onClick={ closeSearch }
        >
          <FontAwesomeIcon
            title="关闭"
            size="lg"
            icon={faTimes} />
        </button>
        </div>
      }
    </div>
  )
}

FileSearch.propTypes = {
  title: ProTypes.string,
  onFileSearch: ProTypes.func.isRequired
}

FileSearch.defaultProps = {
  title: '我的云文档'
}

export default FileSearch