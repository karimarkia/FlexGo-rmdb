import React from 'react'
import { StyledActor } from '../styles/StyledActor'
import NoImage from '../images/no_image.jpg'
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config'

const Actors = ({ actor }) => {
  return (
    <StyledActor>
      <img
        src={
          actor.profile_path
            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
            : NoImage
        }
        alt="actor"
      />
      <span className="actor-name">{actor.name}</span>
      <span className="actor-character">{actor.department}</span>
    </StyledActor>
  )
}

export default Actors
