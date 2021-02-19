import React from "react";
import prettyMilliseconds from "pretty-ms";


function SingleSong({track}) {
  return (
    <tr onClick={() => console.log(track.id)}>
      <td>{track.track_number}</td>
      <td>{track.name}</td>
      <td>
        {prettyMilliseconds(track.duration_ms, {
          compact: false,
          keepDecimalsOnWholeSeconds: false,
          colonNotation: true,
          secondsDecimalDigits:0
        })}
      </td>
    </tr>
  );
}

export default SingleSong;
