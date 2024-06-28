(function(){
      var urlParams = new URLSearchParams(window.location.search)
      var s = urlParams.get('s')
      s = s === 'acuarius' ? 'aquarius' : s
      var pagesubvar = urlParams.get('pagesubvar')
      if (!s && !pagesubvar) {
        window.location = '/'
      }
      if (pagesubvar) {
        s = pagesubvar
      }
      var src = urlParams.get('src')
      var hop = urlParams.get('hop')
      var utm_source = urlParams.get('utm_source')
      var clickid = urlParams.get('clickid')
      var form = document.getElementById('form');
      var s_img = document.getElementById('s_img');
      var s_text = document.getElementById('s_text');
      switch (s) {
        case 'aries':
          setS(s, 'You are confident and know exactly what you want. <br> That’s where your success comes from.');
          break;
        case 'taurus':
          setS(s, 'You’re strong and determined. <br>You always get what you want.');
          break;
        case 'gemini':
          setS(s, 'You’re smart. You don’t wait for opportunities. <br> You create them.');
          break;
        case 'cancer':
          setS(s, 'There are no limits to what you can accomplish. <br> Your determination today means your success tomorrow.');
          break;
        case 'leo':
          setS(s, 'Success is not what you have, <br> but who you are.');
          break;
        case 'virgo':
          setS(s, 'You always take your dreams seriously. <br> That makes you unstoppable.');
          break;
        case 'libra':
          setS(s, 'You’re well balanced and <br> always know where you’re going.  <br> Don’t ever stop.');
          break;
        case 'scorpio':
          setS(s, 'You don’t stop until you get <br> what you want.');
          break;
        case 'sagittarius':
          setS(s, 'You’re made of do-it-material. <br> Don’t ever forget that.');
          break;
        case 'capricorn':
          setS(s, 'Don’t ever stop being confident in your decisions, <br> because it’s exactly why <br> you’re successful.');
          break;
        case 'aquarius':
        case 'acuarius':
          setS(s, 'You’re both a dreamer and a doer. <br>You never give up. Success is your business.');
          break;
        case 'pisces':
          setS(s, 'You are always successful because you never quit. <br>That’s what makes you a winner');
          break;
      }
      if (src) createInput('src', src);
      if (hop) createInput('hop', hop);
      if (utm_source) createInput('utm_source', utm_source);
      if (clickid) createInput('clickid', clickid);
      
      function setS(s, text) {
        s_img.setAttribute('src', 'images/icon-'+s+'53.png')
        s_img.setAttribute('alt', s)
        s_text.innerHTML = '"'+text+'"'
      }
      function createInput(name, value) {
        var input = document.createElement('input');
        input.setAttribute('type','hidden');
        input.setAttribute('name',name);
        input.setAttribute('value',value);
        form.appendChild(input)
      }
  })();