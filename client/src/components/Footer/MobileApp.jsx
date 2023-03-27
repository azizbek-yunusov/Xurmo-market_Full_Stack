import React from "react";
import { useTranslation } from "react-i18next";

const MobileApp = () => {
  let { t } = useTranslation(["home"]);
  return (
    <div className="bg-slate-50 hidden lg:block">
      {/* <div className="container-full md:py-8 flex justify-evenly">
        <div className="flex">
          <img
            src="/images/mobile.png"
            className="lg:h-80 mobile-first object-cover z-20"
            alt=""
          />
          <img
            src="/images/mobile.png"
            className="lg:h-80 mobile-two ml-8 mt-8 object-cover z-10"
            alt=""
          />
        </div>
        <div className="w-13">
          <h1 className="md:text-4xl font-bold md:mb-5">{t("app-dowload")}</h1>
          <p className="md:text-lg to-zinc-500 md:mb-5">
            {t("app-dowload-descr")}
          </p>
          <div className="flex">
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="150"
                height="37"
                viewBox="0 0 1477 500"
              >
                <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                  <g transform="translate(-462 -850)">
                    <g transform="translate(462 850)">
                      <rect
                        width="1477"
                        height="500"
                        x="0"
                        y="0"
                        fill="#000"
                        rx="60"
                      ></rect>
                      <g fill="#FFF" transform="translate(131 88)">
                        <path d="M192.34 150.554c-.321-35.765 29.286-53.165 30.64-53.975-16.768-24.447-42.757-27.787-51.89-28.053-21.827-2.297-43 13.06-54.12 13.06-11.34 0-28.463-12.838-46.917-12.461-23.748.366-45.964 14.115-58.148 35.466-25.146 43.533-6.392 107.507 17.7 142.695 12.05 17.245 26.133 36.476 44.565 35.799 18.032-.733 24.768-11.497 46.53-11.497 21.56 0 27.886 11.497 46.684 11.053 19.353-.289 31.537-17.3 43.167-34.7 13.926-19.73 19.52-39.206 19.741-40.204-.444-.145-37.574-14.315-37.951-57.183"></path>
                        <path d="M156.83 45.378c9.7-12.13 16.335-28.63 14.493-45.376-14.037.622-31.593 9.71-41.702 21.573-8.944 10.453-16.934 27.587-14.87 43.7 15.769 1.176 31.96-7.957 42.08-19.897"></path>
                      </g>
                      <g fill="#FFF" transform="translate(460 219)">
                        <path d="M124.529 149.61H99.328l-13.805-43.378H37.54L24.39 149.61H-.145L47.405 1.932h29.363l47.761 147.678zM81.362 88.033l-12.484-38.55c-1.32-3.95-3.806-13.228-7.446-27.831h-.444c-1.465 6.28-3.806 15.557-7.013 27.83L41.702 88.034h39.66z"></path>
                        <path d="M246.573 95.058c0 18.11-4.916 32.425-14.759 42.934-8.811 9.354-19.764 14.026-32.825 14.026-14.104 0-24.246-5.027-30.405-15.114v55.873h-23.659V78.124c0-11.375-.3-23.037-.877-35h20.807l1.32 16.89h.445c7.89-12.729 19.863-19.087 35.931-19.087 12.562 0 23.049 4.96 31.438 14.892 8.378 9.954 12.584 23.026 12.584 39.239zm-24.103.865c0-10.364-2.33-18.909-7.013-25.634-5.116-7.002-11.985-10.52-20.596-10.52-5.837 0-11.141 1.954-15.88 5.815-4.749 3.873-7.856 8.944-9.31 15.236-.732 2.919-1.098 5.305-1.098 7.191v17.777c0 7.724 2.374 14.26 7.124 19.609 4.75 5.326 10.92 8 18.51 8 8.91 0 15.846-3.45 20.806-10.297 4.972-6.87 7.457-15.924 7.457-27.177z"></path>
                        <path d="M369.05 95.058c0 18.11-4.916 32.425-14.76 42.934-8.821 9.354-19.763 14.026-32.835 14.026-14.093 0-24.236-5.027-30.406-15.114v55.873h-23.658V78.124c0-11.375-.3-23.037-.877-35h20.807l1.32 16.89h.444c7.879-12.729 19.853-19.087 35.932-19.087 12.55 0 23.048 4.96 31.449 14.892 8.367 9.954 12.584 23.026 12.584 39.239zm-24.114.865c0-10.364-2.341-18.909-7.024-25.634-5.105-7.002-11.963-10.52-20.574-10.52-5.837 0-11.141 1.954-15.902 5.815-4.738 3.873-7.845 8.944-9.3 15.236-.72 2.919-1.109 5.305-1.109 7.191v17.777c0 7.724 2.386 14.26 7.113 19.609 4.75 5.315 10.92 8 18.532 8 8.922 0 15.858-3.45 20.807-10.297 4.971-6.87 7.457-15.924 7.457-27.177z"></path>
                        <path d="M505.986 108.196c0 12.562-4.384 22.782-13.128 30.672-9.61 8.612-23.026 12.928-40.226 12.928-15.891 0-28.63-3.063-38.24-9.2l5.47-19.718c10.376 6.136 21.773 9.21 34.179 9.21 8.922 0 15.857-2.02 20.807-6.026 4.971-4.028 7.468-9.388 7.468-16.09 0-6.004-2.064-11.042-6.148-15.136-4.095-4.073-10.864-7.89-20.363-11.375-25.856-9.643-38.795-23.758-38.795-42.301 0-12.118 4.572-22.039 13.683-29.795C439.815 3.619 451.91-.254 466.958-.254c13.438 0 24.635 2.342 33.524 7.013l-5.937 19.287c-8.367-4.528-17.81-6.791-28.375-6.791-8.345 0-14.903 2.053-19.575 6.136-3.94 3.651-5.948 8.101-5.948 13.383 0 5.826 2.275 10.664 6.813 14.448 3.929 3.507 11.097 7.313 21.462 11.397 12.717 5.127 22.05 11.097 28.042 17.955 6.025 6.858 9.022 15.413 9.022 25.622"></path>
                        <path d="M584.408 60.88H558.33v51.7c0 13.15 4.594 19.708 13.804 19.708 4.228 0 7.735-.355 10.51-1.099l.654 17.966c-4.66 1.742-10.797 2.619-18.388 2.619-9.354 0-16.645-2.863-21.927-8.556-5.26-5.704-7.89-15.258-7.89-28.707V60.835h-15.525V43.08h15.525V23.582l23.237-7.013v26.51h26.078v17.8"></path>
                        <path d="M701.835 95.49c0 16.368-4.672 29.807-14.026 40.316-9.777 10.808-22.782 16.212-38.995 16.212-15.647 0-28.086-5.182-37.363-15.547-9.277-10.364-13.916-23.436-13.916-39.205 0-16.501 4.805-30.017 14.348-40.526 9.566-10.509 22.46-15.78 38.673-15.78 15.636 0 28.175 5.205 37.685 15.558 9.078 10.065 13.594 23.037 13.594 38.972zm-24.524.544c0-9.754-2.108-18.121-6.336-25.123-4.96-8.456-12.074-12.673-21.262-12.673-9.466 0-16.756 4.217-21.695 12.673-4.25 7.002-6.347 15.513-6.347 25.567 0 9.765 2.097 18.155 6.347 25.124 5.116 8.466 12.251 12.694 21.506 12.694 9.033 0 16.124-4.327 21.262-12.894 4.339-7.169 6.525-15.591 6.525-25.368z"></path>
                        <path d="M778.77 63.93c-2.341-.432-4.85-.643-7.457-.643-8.323 0-14.759 3.118-19.287 9.421-3.939 5.549-5.903 12.562-5.903 21.03v55.872h-23.659V76.66c0-12.262-.233-23.459-.688-33.524h20.607l.866 20.374h.655c2.507-7.002 6.436-12.65 11.829-16.867 5.282-3.818 10.964-5.715 17.1-5.715 2.186 0 4.162.166 5.915.433l.022 22.57"></path>
                        <path d="M884.58 91.33c0 4.238-.278 7.811-.866 10.73h-70.965c.255 10.52 3.706 18.576 10.287 24.125 5.98 4.949 13.727 7.434 23.214 7.434 10.51 0 20.097-1.664 28.72-5.038l3.706 16.424c-10.076 4.383-21.983 6.58-35.7 6.58-16.511 0-29.473-4.86-38.905-14.559-9.4-9.71-14.126-22.77-14.126-39.105 0-16.046 4.372-29.418 13.16-40.082 9.189-11.386 21.606-17.079 37.23-17.079 15.348 0 26.966 5.693 34.845 17.079 6.259 9.021 9.4 20.207 9.4 33.49zm-22.56-6.137c.166-7.025-1.388-13.062-4.595-18.188-4.095-6.592-10.398-9.877-18.843-9.877-7.745 0-14.037 3.207-18.831 9.644-3.94 5.115-6.28 11.274-7.002 18.398l49.27.023z"></path>
                      </g>
                      <g fill="#FFF" transform="translate(469 92)">
                        <path d="M60.954 76.078H48.56L41.78 54.76H18.198l-6.47 21.317H-.334l23.37-72.585h14.426l23.492 72.585zM39.737 45.816L33.6 26.863c-.643-1.942-1.83-6.459-3.662-13.672h-.222c-.754 3.119-1.83 7.646-3.45 13.672L20.24 45.816h19.497z"></path>
                        <path d="M119.39 23.745L99.573 76.078H88.264L69.088 23.745h12.495l8.945 27.675c1.509 4.628 2.796 9.044 3.761 13.239h.322c.866-3.762 2.153-8.178 3.762-13.239l8.833-27.675h12.185"></path>
                        <path d="M161.581 76.078l-.865-6.026h-.322c-3.551 4.85-8.722 7.213-15.292 7.213-9.366 0-16.046-6.57-16.046-15.402 0-12.917 11.197-19.598 30.583-19.598V41.3c0-6.891-3.662-10.342-10.875-10.342-5.17 0-9.698 1.298-13.671 3.884l-2.364-7.646c4.85-3.019 10.875-4.528 17.988-4.528 13.672 0 20.574 7.213 20.574 21.65v19.276c0 5.282.222 9.377.755 12.495l-10.465-.011zm-1.62-26.067c-12.928 0-19.386 3.13-19.386 10.553 0 5.493 3.34 8.179 7.967 8.179 5.926 0 11.419-4.517 11.419-10.653V50.01z"></path>
                        <path d="M197.191 15.122c-3.873 0-6.891-3.018-6.891-7.002s3.118-6.891 7.113-6.891c3.984 0 7.213 2.907 7.102 6.891 0 4.206-3.007 7.002-7.324 7.002zm-5.593 8.623h11.63v52.333h-11.63V23.745z"></path>
                        <path d="M223.89-.27h11.63v76.348h-11.63V-.27z"></path>
                        <path d="M284.946 76.078l-.877-6.026h-.31c-3.552 4.85-8.723 7.213-15.292 7.213-9.366 0-16.046-6.57-16.046-15.402 0-12.917 11.196-19.598 30.583-19.598V41.3c0-6.891-3.662-10.342-10.875-10.342-5.171 0-9.699 1.298-13.672 3.884l-2.374-7.657c4.849-3.019 10.875-4.528 17.988-4.528 13.671 0 20.584 7.213 20.584 21.65v19.276c0 5.282.222 9.376.733 12.495h-10.442zm-1.62-26.067c-12.928 0-19.387 3.13-19.387 10.553 0 5.493 3.34 8.179 7.968 8.179 5.926 0 11.418-4.517 11.418-10.653V50.01z"></path>
                        <path d="M341.762 77.265c-7.424 0-12.906-3.13-16.468-9.266h-.222l-.666 8.079h-9.898c.31-4.195.422-8.944.422-14.104V-.27h11.651V31.4h.211c3.451-5.814 9.044-8.722 16.69-8.722 12.606 0 21.44 10.775 21.44 26.489 0 16.246-9.81 28.097-23.16 28.097zm-2.364-45.453c-6.691 0-12.817 5.815-12.817 13.893v9.155c0 7.213 5.504 13.14 12.606 13.14 8.711 0 13.905-7.103 13.905-18.41-.011-10.554-5.404-17.778-13.694-17.778z"></path>
                        <path d="M382.132-.27h11.619v76.348h-11.619V-.27z"></path>
                        <path d="M457.048 52.708h-34.911c.233 9.91 6.78 15.502 16.468 15.502 5.182 0 9.92-.866 14.115-2.475l1.809 8.079c-4.95 2.153-10.764 3.23-17.544 3.23-16.38 0-26.067-10.343-26.067-26.378 0-16.046 9.92-28.109 24.768-28.109 13.339 0 21.761 9.91 21.761 24.88.034 2.041-.066 3.872-.4 5.27zm-10.653-8.29c0-8.078-4.106-13.782-11.541-13.782-6.68 0-11.94 5.815-12.717 13.782h24.258z"></path>
                        <path d="M527.535 77.265c-15.291 0-25.2-11.419-25.2-26.921 0-16.157 10.12-27.676 26.077-27.676 15.059 0 25.201 10.875 25.201 26.821 0 16.357-10.453 27.776-26.078 27.776zm.444-46.097c-8.4 0-13.782 7.857-13.782 18.843 0 10.775 5.493 18.632 13.671 18.632 8.179 0 13.672-8.4 13.672-18.854 0-10.653-5.382-18.62-13.56-18.62z"></path>
                        <path d="M616.133 76.078h-11.607v-30.05c0-9.256-3.562-13.894-10.564-13.894-6.892 0-11.641 5.926-11.641 12.817v31.127h-11.607V38.703c0-4.627-.134-9.587-.444-14.97H580.5l.544 8.08h.333c3.096-5.594 9.465-9.156 16.578-9.156 10.964 0 18.177 8.4 18.177 22.072v31.349"></path>
                        <path d="M692.225 32.467H679.43v25.412c0 6.47 2.253 9.698 6.77 9.698 2.041 0 3.783-.221 5.17-.543l.322 8.833c-2.264.865-5.293 1.298-9.033 1.298-9.177 0-14.637-5.06-14.637-18.31V32.467H660.4v-8.722h7.623v-9.588l11.408-3.451v13.028h12.795v8.733"></path>
                        <path d="M753.813 76.078h-11.641V46.249c0-9.366-3.562-14.104-10.553-14.104-6.026 0-11.619 4.095-11.619 12.384v31.549h-11.64V-.27H720v31.437h.222c3.651-5.703 8.944-8.51 15.725-8.51 11.085 0 17.866 8.61 17.866 22.293v31.127"></path>
                        <path d="M813.237 52.708h-34.9c.222 9.91 6.769 15.502 16.468 15.502 5.193 0 9.92-.866 14.093-2.475l1.82 8.079c-4.938 2.153-10.764 3.23-17.556 3.23-16.368 0-26.055-10.343-26.055-26.378 0-16.046 9.91-28.109 24.757-28.109 13.35 0 21.761 9.91 21.761 24.88.044 2.041-.067 3.872-.388 5.27zm-10.664-8.29c0-8.078-4.084-13.782-11.52-13.782-6.68 0-11.95 5.815-12.716 13.782h24.236z"></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </a>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="150"
                height="37"
                viewBox="0 0 1477 500"
              >
                <defs>
                  <linearGradient
                    id="linearGradient-1"
                    x1="58.917%"
                    x2="90.81%"
                    y1="9.59%"
                    y2="60.851%"
                  >
                    <stop offset="0%" stopColor="#FF177B"></stop>
                    <stop offset="100%" stopColor="#FFEC73"></stop>
                  </linearGradient>
                  <linearGradient
                    id="linearGradient-2"
                    x1="37.103%"
                    x2="0%"
                    y1="-44.035%"
                    y2="101.06%"
                  >
                    <stop offset="0%" stopColor="#064AA2"></stop>
                    <stop offset="100%" stopColor="#63FFD4"></stop>
                  </linearGradient>
                  <path
                    id="path-3"
                    d="M139 127L5 0C1.874.726 0 3.065 0 7v243c0 3.339 1.346 5.325 3 6l136-129z"
                  ></path>
                  <path
                    id="path-5"
                    d="M5.534 127.785l77.452-42.547 34.21-18.956 56.324-30.337L136.022-.492.024 128.524c1.515.488 4.187.221 6.271-.808"
                  ></path>
                  <linearGradient
                    id="linearGradient-7"
                    x1="78.645%"
                    x2="2.495%"
                    y1="50%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#FF4521"></stop>
                    <stop offset="100%" stopColor="#8A33DB"></stop>
                  </linearGradient>
                  <linearGradient
                    id="linearGradient-8"
                    x1="0%"
                    x2="64.224%"
                    y1="-24.186%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#00A3B5"></stop>
                    <stop offset="100%" stopColor="#D6FFA1"></stop>
                  </linearGradient>
                  <path
                    id="path-9"
                    d="M7.129 1.147C4.549-.235 1.986-.63-.087-.071l134.111 127.184 37.103-35.111-55.927-30.98-84.541-46.84L7.129 1.147z"
                  ></path>
                </defs>
                <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                  <g transform="translate(-461 -270)">
                    <g transform="translate(461 270)">
                      <rect
                        width="1477"
                        height="500"
                        x="0"
                        y="0"
                        fill="#000"
                        rx="60"
                      ></rect>
                      <g transform="translate(60 179)">
                        <path
                          fill="url(#linearGradient-1)"
                          d="M120.18 61.023S18.273 4.563 12.288 1.245C6.294-2.072.329-.06.329 6.873v243.513c0 5.19 4.262 7.44 9.47 4.562 5.199-2.879 110.38-61.162 110.38-61.162l21.433-11.869 34.494-19.1s47.453-26.298 53.766-29.785c6.304-3.496 5.696-8.287.379-11.047-5.328-2.749-54.145-29.983-54.145-29.983l-55.927-30.98z"
                        ></path>
                        <g>
                          <mask id="mask-4" fill="#fff">
                            <use xlinkHref="#path-3"></use>
                          </mask>
                          <use
                            fill="url(#linearGradient-2)"
                            xlinkHref="#path-3"
                          ></use>
                          <path
                            d="M176 92l-56-31c-.196.451-102.062-56.113-108-59C5.963-1.76 0 .257 0 7v244c0 5.361 4.26 7.617 9 5 5.663-3.151 110.804-61.542 111-62l56-31c-.291.432 47.143-25.914 53-29 6.755-3.91 6.148-8.71 1-11-5.493-3.228-54.291-30.513-54-31"
                            mask="url(#mask-4)"
                          ></path>
                        </g>
                        <g transform="translate(2.983 127.504)">
                          <mask id="mask-6" fill="#fff">
                            <use xlinkHref="#path-5"></use>
                          </mask>
                          <path
                            fill="url(#linearGradient-7)"
                            d="M117.017-66.504c-.197.451-102.062-56.113-108-59-6.038-3.76-12-1.743-12 5v244c0 5.362 4.26 7.617 9 5 5.663-3.151 110.803-61.542 111-62l56-31c-.291.432 47.142-25.914 53-29 6.755-3.91 6.148-8.71 1-11-5.494-3.228-54.291-30.512-54-31l-56-31z"
                            mask="url(#mask-6)"
                          ></path>
                        </g>
                        <g transform="translate(4.98)">
                          <mask id="mask-10" fill="#fff">
                            <use xlinkHref="#path-9"></use>
                          </mask>
                          <use
                            fill="url(#linearGradient-8)"
                            xlinkHref="#path-9"
                          ></use>
                          <path
                            d="M171.02 92l-56-31c-.195.451-102.061-56.113-108-59-6.036-3.76-12-1.743-12 5v244c0 5.361 4.261 7.617 9 5 5.664-3.151 110.805-61.542 111-62l56-31c-.29.432 47.144-25.914 53-29 6.756-3.91 6.149-8.71 1-11-5.493-3.228-54.29-30.513-54-31"
                            mask="url(#mask-10)"
                          ></path>
                        </g>
                      </g>
                      <g fill="#FFF" transform="translate(347 201)">
                        <path d="M664.615 147.87l-11.073 10.51c-2.56 1.415-5.105 3.058-7.644 4.224-7.69 3.513-15.512 4.396-22.463 4.396-7.396 0-18.99-.483-30.82-9.089C576.184 146.27 569 126.255 569 108.816 569 72.709 598.221 55 622.056 55c8.33 0 16.885 2.098 23.842 6.522 11.568 7.695 14.56 17.694 16.22 23.05l-54.429 22.118-17.825 1.394c5.77 29.606 25.681 46.825 47.685 46.825 10.99 0 19.149-3.61 26.634-7.33 0 0 1.503-.786.432.29zM631.36 88.478c4.369-1.626 6.641-3.03 6.641-6.295C638 72.818 627.656 62 615.311 62 606.168 62 589 69.295 589 94.626c0 3.953.461 8.164.692 12.374l41.667-18.522z"></path>
                        <path d="M551.026 146.603c0 9.026 1.6 10.43 9.184 11.14 3.953.467 7.892.674 11.79 1.142L563.465 164h-40.668c5.334-6.967 6.25-7.662 6.25-12.302v-5.184l-.089-138.129H511L528.288 0h33.003c-7.153 4.172-9.294 6.712-10.21 14.843l-.055 131.76"></path>
                        <path d="M487.93 66.398c5.29 4.384 16.33 13.69 16.33 31.34 0 17.202-9.62 25.31-19.321 32.985-2.977 3.022-6.459 6.299-6.459 11.365 0 5.142 3.482 7.93 5.988 10.008l8.322 6.478c10.118 8.61 19.342 16.506 19.342 32.544 0 21.848-20.974 43.882-60.606 43.882C418.14 235 402 218.969 402 201.78c0-8.363 4.13-20.209 17.758-28.325 14.283-8.803 33.632-9.98 43.995-10.669-3.236-4.212-6.93-8.625-6.93-15.825 0-3.937 1.175-6.284 2.308-9.051-2.519.24-5.059.488-7.366.488-24.436 0-38.247-18.378-38.247-36.489 0-10.683 4.834-22.536 14.76-31.127C441.414 59.88 457.076 58 469.523 58H517l-14.76 8.398h-14.31zm-16.21 102.854c-1.906-.252-3.049-.252-5.348-.252-2.106 0-14.653.463-24.371 3.784C436.86 174.697 422 180.352 422 197.15c0 16.762 16.043 28.85 40.862 28.85 22.3 0 34.138-10.883 34.138-25.536 0-12.06-7.66-18.423-25.28-31.212zm6.515-44.737c5.303-5.345 5.765-12.729 5.765-16.922C484 90.94 474.163 65 455.094 65c-5.948 0-12.392 3.012-16.05 7.672-3.882 4.824-5.044 11.082-5.044 17.1 0 15.509 8.96 41.228 28.668 41.228 5.75 0 11.937-2.82 15.567-6.485z"></path>
                        <path d="M344.337 167c-36.7 0-56.337-28.951-56.337-55.165C288 81.207 312.686 55 347.799 55 381.742 55 403 81.92 403 110.186 403 137.792 381.988 167 344.337 167zm28.701-18.935c5.603-7.507 6.962-16.876 6.962-26.01C380 101.397 370.279 62 341.547 62c-7.642 0-15.338 3.024-20.885 7.959C311.613 78.168 310 88.483 310 98.603 310 121.777 321.314 160 349.394 160c9.062 0 18.31-4.442 23.644-11.935z"></path>
                        <path d="M221.333 167C184.61 167 165 138.049 165 111.835 165 81.207 189.703 55 224.817 55 258.754 55 280 81.92 280 110.186 280 137.792 259.007 167 221.333 167zm28.716-18.935c5.564-7.507 6.951-16.876 6.951-26.01C257 101.397 247.246 62 218.528 62c-7.673 0-15.29 3.024-20.854 7.959C188.607 78.168 187 88.483 187 98.603 187 121.777 198.368 160 226.413 160c9.046 0 18.285-4.442 23.636-11.935z"></path>
                        <path d="M149.775 160.08l-31.086 7.165C106.094 169.243 94.784 171 82.807 171 22.847 171 0 126.582 0 91.817 0 49.363 32.371 10 87.81 10c11.728 0 23.011 1.736 33.29 4.557 16.293 4.606 23.913 10.284 28.675 13.61l-18.058 17.261-7.613 1.715 5.428-8.706c-7.352-7.227-20.868-20.567-46.52-20.567-34.294 0-60.165 26.237-60.165 64.542 0 41.14 29.54 79.84 76.918 79.84 13.922 0 21.088-2.815 27.596-5.443V121.54l-32.825 1.778 17.398-9.406H158l-5.635 5.457c-1.518 1.3-1.724 1.743-2.15 3.485-.227 1.992-.44 8.326-.44 10.553v26.673"></path>
                        <path d="M731.702 148.94V208H720V57.714h11.702v17.117C739.326 63.768 753.256 55 769.435 55 798.455 55 818 77.064 818 111.992c0 34.694-19.545 57.219-48.565 57.219-15.274 0-28.957-7.896-37.733-20.271zM806 112.892C806 86.29 792.258 66 767.892 66 752.76 66 738.29 78 732 88.464v48.614C738.29 147.563 752.76 160 767.892 160 792.258 160 806 139.536 806 112.892z"></path>
                        <path d="M834 16h12v151h-12V16z"></path>
                        <path d="M976.463 197.601c2.503 1.12 6.774 1.808 9.482 1.808 7.158 0 12.142-2.935 16.62-13.3l8.535-19.388L965 57h13.054l39.545 95.081L1056.761 57H1070l-56.226 132.745C1007.939 203.423 998.759 210 986.15 210c-3.785 0-8.776-.674-11.697-1.574l2.01-10.825"></path>
                        <path d="M943.438 166.851a203.472 203.472 0 01-1.814-9.93 66.743 66.743 0 01-.565-8.526c-4.034 5.935-9.75 10.876-17.052 14.766C916.7 167.08 909.755 169 900.233 169c-11.466 0-20.368-2.826-26.718-8.561-6.33-5.729-9.515-13.489-9.515-23.308 0-9.805 4.613-17.765 13.81-23.853 9.199-6.115 21.086-9.155 35.8-9.155h27.449V90.53c0-7.83-2.662-13.986-7.978-18.45-5.337-4.47-12.825-6.73-22.533-6.73-8.874 0-16.072 2.066-21.554 6.088-5.433 4.104-8.17 9.19-8.17 15.319h-12.046l-.248-.587c-.434-8.265 3.337-15.513 11.356-21.773C887.871 58.144 898.33 55 911.203 55c12.832 0 23.216 3.096 31.042 9.273 7.819 6.115 11.742 14.953 11.742 26.507v53.966c0 3.877.186 7.622.669 11.27A71.7 71.7 0 00957 166.851h-13.563zM901.649 159c9.99 0 17.168-2.25 24.505-6.702 7.289-4.425 12.249-10.196 14.846-17.184V114h-27.557c-10.526 0-19.24 2.348-26.096 7.084C880.48 125.807 877 131.524 877 138.17c0 6.272 2.205 11.287 6.586 15.086 4.395 3.84 10.403 5.744 18.063 5.744z"></path>
                      </g>
                      <g fill="#FFF" transform="translate(343 80)">
                        <path d="M.042 35.311c0-21.54 17.201-35.396 38.59-35.396 14.335 0 23.71 6.364 29.552 14.157l-10.47 5.646c-3.968-5.133-10.919-9.126-19.082-9.126-14.548 0-25.357 10.254-25.357 24.719 0 14.253 10.809 24.719 25.357 24.719 7.502 0 14.115-3.179 17.421-6.153V43.31h-22.05V32.741h34.843v25.546c-7.165 7.492-17.532 12.516-30.214 12.516-21.389 0-38.59-14.048-38.59-35.492"></path>
                        <path d="M85.525 69.76V.959h51.081V11.59H98.604v17.734h37.22V39.95h-37.22v19.184h38.002v10.627h-51.08"></path>
                        <path d="M171.345 69.76V11.59h-22.23V.958h57.337V11.59h-22.23v58.17h-12.877"></path>
                        <path d="M252.32.958h12.51V69.76h-12.51V.958z"></path>
                        <path d="M300.618 69.76V11.59h-22.236V.958h57.336V11.59h-22.222v58.17h-12.878"></path>
                        <path d="M378.46 35.362c0-20.448 15.733-35.447 38.053-35.447 22.195 0 38.047 15 38.047 35.447 0 20.442-15.852 35.441-38.047 35.441-22.32 0-38.054-14.999-38.054-35.44zm62.548-.524c0-14.03-9.64-24.498-24.495-24.498-14.965 0-24.501 10.467-24.501 24.498 0 13.923 9.536 24.498 24.501 24.498 14.855 0 24.495-10.575 24.495-24.498z"></path>
                        <path d="M520.312 69.76l-38.291-49.2v49.2h-12.867V.959h13.204l37.514 47.66V.958h12.873V69.76h-12.433"></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MobileApp;