import React, { useEffect } from 'react'

import s from './HomePage.module.scss';

export default function HomePage() {

  const mouseOverHandler = (e) => {
    console.log(e.currentTarget);
  }

  useEffect(() => {
    fetch('https://api.your-money.pp.ua/api/v1/login', {
      method: "POST",
      body: JSON.stringify({
        "email": "test@gmail.com",
        "password": "123qweASD"
      })
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
    
  }, [])

  return (
    <div className={s.homepage}>
      <section className={s.main_banner}>
        <div className={s.main_banner_bg}></div>
        <div className={s.main_banner_content}>
          <div className={s.main_banner_text}>
            <h1>Your Money</h1>
            <p>Your Money is a versatile expense tracker that helps efficiently manage finances.</p>
            <p>Keep track of income and expenses, categorize expenditures, and visualize expense charts for better financial management.</p>
          </div>
          <div className={s.main_banner_img}>
            <img src="./assets/images/svg/main_banner.svg" alt="main_banner"/>
          </div>
        </div>
      </section>
      <section className={s.page_block}>
        <p className={s.title}>How It Works</p>
        <ul className={s.step_list}>
          <li className={s.step_item} onMouseOver={mouseOverHandler}>
            <p className={s.step_title}>Step #1</p>
            <p className={s.step_description}>Register or login.</p>
          </li>
          <li className={s.step_item} onMouseOver={mouseOverHandler}>
            <p className={s.step_title}>Step #2</p>
            <p className={s.step_description}>Add income.</p>
          </li>
          <li className={s.step_item} onMouseOver={mouseOverHandler}>
            <p className={s.step_title}>Step #3</p>
            <p className={s.step_description}>Add expenses.</p>
          </li>
          <li className={s.step_item} onMouseOver={mouseOverHandler}>
            <p className={s.step_title}>Step #4</p>
            <p className={s.step_description}>Control your budget.</p>
          </li>
        </ul>
      </section>
      <section className={s.page_block}>
      <p className={s.title}>Features</p>
        <ul className={s.features_list}>
          <li className={s.features_item}>
            <div className={s.features_item_img}>
              <img src="./assets/images/svg/ease_of_use.svg" alt="Ease of use" />
            </div>
            <div className={s.features_item_text}>
              <p className={s.features_title}>Ease of use</p>
              <p className={s.features_description}>Your Money provides an intuitive and simple interface that makes it easy to keep track of expenses and income, even for non-specialists in finance.</p>
            </div>
          </li>
          <li className={s.features_item}>
            <div className={s.features_item_img}>
              <img src="./assets/images/svg/category.svg" alt="Categorisation of expenses" width={200} height={200}/>
            </div>
            <div className={s.features_item_text}>
              <p className={s.features_title}>Categorisation of expenses</p>
              <p className={s.features_description}>Users can easily add categories to their expenses, allowing them to get a detailed overview of their finances and perform analyses that will help them manage their finances effectively</p>
            </div>
          </li>
          <li className={s.features_item}>
            <div className={s.features_item_img}>
              <img src="./assets/images/svg/graph.svg" alt="Data visualisation" width={200} height={200}/>
            </div>
            <div className={s.features_item_text}>
              <p className={s.features_title}>Data visualisation</p>
              <p className={s.features_description}>Your Money offers graphs and charts that illustrate spending over a period of time, allowing users to quickly and easily assess their spending habits and make adjustments accordingly</p>
            </div>
          </li>
          <li className={s.features_item}>
            <div className={s.features_item_img}>
              <img src="./assets/images/svg/free_of_charge.svg" alt="Free" width={200} height={200}/>
            </div>
            <div className={s.features_item_text}>
              <p className={s.features_title}>Free</p>
              <p className={s.features_description}>Your Money is a free service, making it available to all users at no additional cost. Users can get all the benefits of an expense and income tracker without having to pay for a subscription or pay a fee</p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  )
}
