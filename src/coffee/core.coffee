# root 
root = exports ? (window ? this)

root.init = ->
	# Youtube
	tag = document.createElement('script')
	tag.src = '//www.youtube.com/iframe_api'
	firstScriptTag = document.getElementsByTagName('script')[0]
	firstScriptTag.parentNode.insertBefore tag, firstScriptTag
	# Youtube

	#variables
	url = 'http://' + document.location.hostname + '/'
	core = null
	windowAlto = $( window ).outerHeight()

	comparar = null

	if $(window).width() <= 767
		core = true
	else
		core = false

	setSize = ->
		windowAlto = $( window ).outerHeight()
		anchura = $(window).width()
		if anchura <= 767
			if core == true
				core = false
				mobile()
				# tabsMobile()
		else if anchura >= 768
			if core == false
				core = true
				desktop()
				# tabsDesktop()
		return

	desktop = ->

		return

	mobile = ->

		return

	# Youtube
	@videoYoutube = ->
		$('.codigoYoutube').each (i) ->
			videoId = $(this).attr 'data-youtube'

			window['player'+[i]] = new (YT.Player)(
				$('.codigoYoutube')[i]
				videoId: videoId
				height: '100%'
				width: '100%'
			)
			return
		return
	# Youtube

	cronometro = ->
		now = new Date
		start = new Date(now.getFullYear(), 0, 0)
		diff = now - start
		oneDay = 1000 * 60 * 60 * 24
		day = Math.floor(diff / oneDay)
		diaFinal = 242 - day
		dias = diaFinal
		horas = 24 - now.getHours()
		minutos = 59 - now.getMinutes()
		segundos = 59 - now.getSeconds()
		$('#dias').html diaFinal
		$('#horas').html horas
		$('#minutos').html minutos
		$('#segundos').html segundos
		contadorMinutos = setInterval((->
			if segundos == 0
				segundos = 59
				$('#segundos').html 59
				if minutos == 1
					minutos = 59
					$('#minutos').html 59
					if horas == 0
						horas = 24
						$('#horas').html 23
						$('#dias').html --diaFinal
					else
						$('#horas').html --horas
				else
					$('#minutos').html --minutos
			else
				$('#segundos').html --segundos
			return
		), 1000)
		return

	$('.video').on 'click', ->
		imagen = $(this).find '.img'
		video = $(this).find 'video'

		imagen.velocity('fadeOut', 0)
		video.velocity('fadeIn', 350)
		jQuery(video).trigger('play')
		return

	$('.circulo').on 'click', ->
		codigo = $(this).attr 'data-codigo'

		if comparar != codigo
			$('.promo .multimedia').empty()
			$('.promo .multimedia').append('<div class="codigoYoutube" data-youtube='+codigo+'></div>')
			videoYoutube()
			console.log(codigo)
			comparar = codigo

		if !$(this).children('.img').hasClass('activo')
			$('.circulo .img').removeClass 'activo'
		$(this).children('.img').toggleClass 'activo'
		return

	inicio = ->
		setSize()
		cronometro()
		return

	$(window).resize ->
		setSize()
		return

	$(window).on 'scroll', ->
		return

	inicio()

	$(window).on 'load', ->
		# Youtube
		videoYoutube()
		# Youtube
		$('.nd-Slider video').prop('muted', true)
		return
	return
		
init()