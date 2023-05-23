import { nanoid } from "nanoid";
import { useState } from "react";
import Alert from "../Alert/Alert";
import styles from "./AddMovieForm.module.css";

// Menangkap props
function AddMovieForm(props) {
  /**
   * Ini hanya snippet(potongan) code.
   * Kode yang lainnya tetap sama.
   */

  // Destructing props: state movies
  const { movies, setMovies } = props;

  //Membuat State object
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    poster: "",
    type: ""
  });


  //Membuat Fungsi handleChange
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    }); 
  }
  
  // Membuat state: isTitleError, isDateError
  const [isTitleError, setIsTitleError] = useState(false);
  const [isDateError, setIsDateError] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const [isTagError, setIsTagError] = useState(false);

  const { title, date, image, type } = formData;

  function validate() {
    if (title === "") {
      setIsTitleError(true);
      return false;
    }
    else if (date === "") {
      setIsDateError(true);
      setIsTitleError(false);
      return false;
    }
    else if (image === "") {
      setIsImageError(true);
      setIsDateError(false);
      return false;
    }
    else {
      setIsTitleError(false);
      setIsDateError(false);
      setIsImageError(false)
      return true;
    }
  }

  function addMovie() {
    const movie = {
      id : nanoid(),
      title: title,
      year: date,
      type: "movie",
      poster: image
    };
  
    setMovies([...movies, movie]);
  }

  function handleSubmit(e) {
    /**
     * Mencegah perilaku default form.
     * Mencegah form direfresh ketika disubmit.
     */
    e.preventDefault();

  validate() && addMovie();
}
  return (
    <div className={styles.container}>
      <section className={styles.form}>
        <div className={styles.form__left}>
          <img
            className={styles.form__image}
            src="https://picsum.photos/536/354"
            alt=""
          />
        </div>
        <div className={styles.form__right}>
          <h2 className={styles.form__title}>Add Movie Form</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.form__group}>
              <label htmlFor="title" className={styles.form__label}>
                Title
              </label>
              <input
                id="title"
                className={styles.form__input}
                type="text"
                name="title"
                // Memberikan value input: title
                value={title}
                // Memberikan event onChange
                onChange={handleChange}
              />
              {/*
               * Menambahkan infline if: operator &&
               * Jika isTitleError true maka render error
               */}
              {isTitleError && <Alert>Title Wajib Diisi</Alert>}
            </div>
            <div className={styles.form__group}>
              <label htmlFor="date" className={styles.form__label}>
                Date
              </label>
              <input
                id="date"
                className={styles.form__input}
                type="text"
                name="date"
                // Memberikan value input: date
                value={date}
                // Memberikan event onChange
                onChange={handleChange}
              />
              {/*
               * Menambahkan infline if: operator &&
               * Jika isDateError true maka render error
               */}
              {isDateError && <Alert>Date Wajib Diisi</Alert>}
            </div>
            
            <div className={styles.form__group}>
              <label htmlFor="image" className={styles.form__label}>
                Image
              </label>
              <input
                id="image"
                className={styles.form__input}
                type="text"
                name="image"
                // Memberikan value input: date
                value={image}
                // Memberikan event onChange
                onChange={handleChange}
              />
              {/*
               * Menambahkan infline if: operator &&
               * Jika isDateError true maka render error
               */}
              {isImageError && <Alert>Image Wajib Diisi</Alert>}
            </div>

            <div className={styles.form__group}>
              <label htmlFor="tag" className={styles.form__label}>
                Tag
              </label>
              <select id="tag" name="tag" className={styles.form__input} onChange={handleChange}>
                <option value="Action">Action</option>
                <option value="Drama">Drama</option>
                <option value="Horror">Horror</option>
                <option value="Komedi">Komedi</option>
              </select>
              {/*
               * Menambahkan infline if: operator &&
               * Jika isDateError true maka render error
               */}
              {isTagError && <Alert>Pilih Tag</Alert>}
            </div>

            <div>
              <button className={styles.form__button}>Add Movie</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default AddMovieForm;