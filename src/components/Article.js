import React from 'react'

function Article( props  ) {
    return (
        <div>
            <div className="article">
                {props.url}
            </div>
        </div>
    )
}

export default Article
