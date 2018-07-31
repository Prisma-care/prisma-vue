<template>
  <header class="d-print-none main">

    <div class="container">

      <nav class="navbar navbar-light navbar-expand-md d-flex justify-content-between">

       <nuxt-link to="/" class="navbar-brand mr-auto">
        <svg id="logo" width="71px" height="62px" viewBox="0 0 71 62" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path d="M11.8999497,11.2284332 L62.6562202,23.6249066 C66.948338,24.6731933 69.5779827,29.0024465 68.529696,33.2945644 C68.1821769,34.7174506 67.4506896,36.0176214 66.4149834,37.0533276 L28.0551863,75.4131247 C24.930992,78.537319 19.8656722,78.537319 16.7414778,75.4131247 C15.7057716,74.3774185 14.9742843,73.0772477 14.6267653,71.6543615 L2.23029192,20.898091 C1.1820052,16.6059732 3.81164988,12.2767199 8.10376771,11.2284332 C9.35083392,10.9238556 10.6528835,10.9238556 11.8999497,11.2284332 Z" id="Rectangle" fill="#ABAEB4" transform="translate(35.379994, 44.378135) rotate(-315.000000) translate(-35.379994, -44.378135) "></path>
          </g>
        </svg>
        Prisma
      </nuxt-link>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav ml-auto">
          <li><nuxt-link class="nav-link verhalen nav-item" to="/resident">Verhalen</nuxt-link></li>
          <li><nuxt-link class="nav-link nav-item" to="/family">Familie uitnodigen</nuxt-link></li>
        </ul>

      </div>

    </nav>
  </div>
</header>
</template>
