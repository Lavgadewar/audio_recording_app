import React from "react";

class AudioForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      audiolink: null,
      data: null,
      file2: null,
      audiolink3: null,
    };
  }

  handleSubmit = (event) => {
    console.log("aaaa", this.props.fileaudio);
    event.preventDefault();
    console.log(this.state.file);

    const formData = new FormData();

    formData.append("audio_file", this.props.fileaudio);

    fetch("http://127.0.0.1:8000/data/list/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("data", json);
        this.setState({ data: json });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  handleChange2 = (event) => {
    const filea = this.state.data;

    this.setState({ file2: filea });

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const audioBlob = new Blob([reader.result], { type: filea.type });

      // Create a URL for the audio blob
      const audioUrl2 = URL.createObjectURL(audioBlob);

      // Update the component's state with the audio URL
      this.setState({ audiolink3: audioUrl2 });
    });

    reader.readAsArrayBuffer(filea);
  };

  handleChange = (event) => {
    const file = event.target.files[0];
    this.setState({ file: file });

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const audioBlob = new Blob([reader.result], { type: file.type });

      // Create a URL for the audio blob
      const audioUrl = URL.createObjectURL(audioBlob);

      // Update the component's state with the audio URL
      this.setState({ audiolink: audioUrl });
    });

    reader.readAsArrayBuffer(file);
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input type="file" name="audioFile" onChange={this.handleChange} />
          <button type="submit">Upload Audio</button>
          {this.state.audiolink !== null ? (
            <audio controls src={this.state.audiolink}></audio>
          ) : null}
          <br></br>
          <input
            type="button"
            value={"play"}
            name="audioFile2"
            onClick={this.handleChange2}
          />{" "}
        </form>
        {this.state.data !== null ? (
          <audio controls src={this.state.audiolink3}></audio>
        ) : null}
      </>
    );
  }
}

export default AudioForm;
